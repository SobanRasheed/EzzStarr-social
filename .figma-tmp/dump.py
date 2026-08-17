"""Compact Figma node-tree dumper: prints layout/style/text facts, not raw JSON."""
import json, sys

def hexc(c, o=1.0):
    a = c.get('a', 1) * o
    r, g, b = [round(c.get(k, 0) * 255) for k in ('r', 'g', 'b')]
    if a >= 0.999:
        return '#%02x%02x%02x' % (r, g, b)
    return 'rgba(%d,%d,%d,%.2f)' % (r, g, b, a)

def paint(p):
    if not p.get('visible', True):
        return None
    t = p['type']
    o = p.get('opacity', 1.0)
    if t == 'SOLID':
        return hexc(p['color'], o)
    if t.startswith('GRADIENT'):
        stops = ' '.join(hexc(s['color'], o) + '@' + str(round(s['position'], 2)) for s in p.get('gradientStops', []))
        hs = p.get('gradientHandlePositions', [])
        h = ' handles=' + ';'.join('%.2f,%.2f' % (x['x'], x['y']) for x in hs) if hs else ''
        return '%s[%s]%s' % (t, stops, h)
    if t == 'IMAGE':
        return 'IMG(ref=%s,%s)' % (p.get('imageRef'), p.get('scaleMode'))
    return t

def paints(lst):
    out = [paint(p) for p in (lst or [])]
    out = [o for o in out if o]
    return ','.join(out)

def walk(n, ox, oy, depth, maxd, out, path=''):
    bb = n.get('absoluteBoundingBox') or {}
    x = bb.get('x'); y = bb.get('y')
    rel = ''
    if x is not None:
        rel = 'x=%d y=%d w=%d h=%d' % (round(x - ox), round(y - oy), round(bb.get('width', 0)), round(bb.get('height', 0)))
    bits = [rel]
    if n.get('layoutMode') and n['layoutMode'] != 'NONE':
        lm = n['layoutMode'][0]  # H/V
        g = 'flex=%s gap=%s' % (lm, n.get('itemSpacing', 0))
        pads = [n.get('paddingTop', 0), n.get('paddingRight', 0), n.get('paddingBottom', 0), n.get('paddingLeft', 0)]
        if any(pads):
            g += ' pad=%s' % '/'.join(str(round(p)) for p in pads)
        for k in ('primaryAxisAlignItems', 'counterAxisAlignItems', 'layoutWrap'):
            if n.get(k):
                g += ' %s=%s' % (k[:6], n[k])
        bits.append(g)
    f = paints(n.get('fills'))
    if f:
        bits.append('fill=' + f)
    s = paints(n.get('strokes'))
    if s:
        bits.append('stroke=%s w=%s' % (s, n.get('strokeWeight')))
    if n.get('cornerRadius'):
        bits.append('r=%s' % n['cornerRadius'])
    elif n.get('rectangleCornerRadii'):
        bits.append('r=%s' % '/'.join(str(v) for v in n['rectangleCornerRadii']))
    for e in (n.get('effects') or []):
        if e.get('visible', True):
            bits.append('%s(%s r=%s off=%s,%s)' % (e['type'], hexc(e.get('color', {})) if e.get('color') else '', e.get('radius'),
                        (e.get('offset') or {}).get('x'), (e.get('offset') or {}).get('y')))
    if n.get('opacity', 1) != 1:
        bits.append('op=%s' % round(n['opacity'], 2))
    if n.get('clipsContent'):
        bits.append('clip')
    st = n.get('style') or {}
    if st:
        bits.append('font=%s %s/%s w%s ls=%s %s' % (st.get('fontFamily'), st.get('fontSize'), round(st.get('lineHeightPx', 0)),
                    st.get('fontWeight'), round(st.get('letterSpacing', 0), 2), st.get('textAlignHorizontal', '')))
    if n.get('characters'):
        bits.append('TEXT=%r' % n['characters'][:160])
    for it in (n.get('interactions') or []):
        for a in (it.get('actions') or []):
            if a.get('destinationId'):
                bits.append('->NAV(%s trigger=%s)' % (a['destinationId'], it.get('trigger', {}).get('type')))
    if n.get('componentId'):
        bits.append('cmp=%s' % n['componentId'])
    out.append('%s%s [%s] %s | %s' % ('  ' * depth, n.get('name'), n.get('type'), n.get('id'), '  '.join(b for b in bits if b)))
    if depth < maxd:
        for c in (n.get('children') or []):
            walk(c, ox, oy, depth + 1, maxd, out)

if __name__ == '__main__':
    fn = sys.argv[1]; maxd = int(sys.argv[2]) if len(sys.argv) > 2 else 4
    sub = sys.argv[3] if len(sys.argv) > 3 else None
    d = json.load(open(fn, encoding='utf-8'))
    root = list(d['nodes'].values())[0]['document']
    bb = root['absoluteBoundingBox']; ox, oy = bb['x'], bb['y']
    target = root
    if sub:
        stack = [root]
        while stack:
            n = stack.pop()
            if n.get('id') == sub:
                target = n; break
            stack.extend(n.get('children') or [])
    out = []
    walk(target, ox, oy, 0, maxd, out)
    print('\n'.join(out))
