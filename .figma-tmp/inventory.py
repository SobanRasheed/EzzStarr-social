"""Inventory image fills + vector/icon nodes across the 5 tournament screens."""
import json, os, sys, collections

SCREENS = ['overview', 'prizes', 'roles', 'participants', 'brackets']

def iter_nodes(n, parent=None, depth=0):
    yield n, parent, depth
    for c in (n.get('children') or []):
        yield from iter_nodes(c, n, depth + 1)

def main():
    imgs = collections.defaultdict(set)      # imageRef -> {screen:nodename}
    vectors = collections.defaultdict(list)  # screen -> [(id,name,w,h)]
    for s in SCREENS:
        p = os.path.join('screens', 'node-%s.json' % s)
        d = json.load(open(p, encoding='utf-8'))
        root = list(d['nodes'].values())[0]['document']
        for n, par, _ in iter_nodes(root):
            for f in (n.get('fills') or []):
                if f.get('type') == 'IMAGE' and f.get('imageRef'):
                    imgs[f['imageRef']].add('%s:%s' % (s, n.get('name')))
            t = n.get('type')
            if t in ('VECTOR', 'BOOLEAN_OPERATION', 'STAR', 'LINE', 'REGULAR_POLYGON'):
                bb = n.get('absoluteBoundingBox') or {}
                pname = par.get('name') if par else ''
                vectors[s].append((n['id'], n.get('name'), pname, round(bb.get('width', 0)), round(bb.get('height', 0))))
    print('=== IMAGE FILLS: %d unique ===' % len(imgs))
    for ref, users in imgs.items():
        print(ref, '|', '; '.join(sorted(users))[:170])
    print()
    for s in SCREENS:
        print('=== VECTORS in %s: %d ===' % (s, len(vectors[s])))
        seen = set()
        for vid, name, pname, w, h in vectors[s]:
            key = (name, pname, w, h)
            if key in seen:
                continue
            seen.add(key)
            print('  %s | %s | parent=%s | %sx%s' % (vid, name, pname, w, h))

main()
