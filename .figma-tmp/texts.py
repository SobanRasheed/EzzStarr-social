"""Dump every TEXT node's content in document order for a screen (or subtree)."""
import json, sys

def find(n, i):
    if n.get('id') == i:
        return n
    for c in (n.get('children') or []):
        r = find(c, i)
        if r:
            return r

def walk(n, out):
    if n.get('type') == 'TEXT' and n.get('characters'):
        bb = n.get('absoluteBoundingBox') or {}
        st = n.get('style') or {}
        out.append((round(bb.get('y', 0)), round(bb.get('x', 0)), st.get('fontSize'), st.get('fontWeight'), n['characters']))
    for c in (n.get('children') or []):
        walk(c, out)

fn = sys.argv[1]
sub = sys.argv[2] if len(sys.argv) > 2 else None
d = json.load(open(fn, encoding='utf-8'))
root = list(d['nodes'].values())[0]['document']
oy = root['absoluteBoundingBox']['y']; ox = root['absoluteBoundingBox']['x']
target = find(root, sub) if sub else root
out = []
walk(target, out)
for y, x, fs, fw, txt in out:
    print('y%-5d x%-5d %sp/%s  %s' % (y - oy, x - ox, fs, fw, txt.replace('\n', ' \\n ')[:230]))
