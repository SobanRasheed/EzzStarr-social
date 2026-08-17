"""Export Figma vector icons as SVG into the app asset folder."""
import json, os, urllib.request, urllib.parse

TOKEN = os.environ['FIGMA_TOKEN']
FILE = 'zialThNpBT3P9TubL0g8Jp'
OUT = os.path.join('..', 'src', 'components', 'events', 'assets', 'tournament')

ICONS = {
    'icon-discord': 'I8475:90868;7394:28654',
    'icon-telegram': 'I8475:90868;7394:28645',
    'icon-x': 'I8475:90868;7394:28636',
    'icon-instagram': 'I8475:90868;7394:28602',
    'icon-linkedin': 'I8475:90868;7394:28591',
    'icon-reddit': 'I8475:90868;5053:41943;226:3173',
    'icon-search': 'I8475:90868;5053:41906',
    'icon-users': '8475:90927',
    'icon-faq-open': 'I8475:90966;5184:17445',
    'icon-faq-closed': 'I8475:90970;7915:38722',
    'icon-plus': 'I8475:90936;361:3731',
}

ids = ','.join(ICONS.values())
url = 'https://api.figma.com/v1/images/%s?ids=%s&format=svg' % (FILE, urllib.parse.quote(ids, safe=','))
req = urllib.request.Request(url, headers={'X-Figma-Token': TOKEN})
data = json.loads(urllib.request.urlopen(req, timeout=120).read())
if data.get('err'):
    raise SystemExit('figma error: %s' % data['err'])

os.makedirs(OUT, exist_ok=True)
for name, node in ICONS.items():
    src = data['images'].get(node)
    if not src:
        print('MISSING', name, node)
        continue
    svg = urllib.request.urlopen(src, timeout=60).read()
    path = os.path.join(OUT, name + '.svg')
    with open(path, 'wb') as fh:
        fh.write(svg)
    print('%-18s %6d bytes' % (name + '.svg', len(svg)))
