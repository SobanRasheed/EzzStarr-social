"""Download Figma image fills into the app asset folder with semantic names."""
import json, os, urllib.request, sys

OUT = os.path.join('..', 'src', 'components', 'events', 'assets', 'tournament')

NAMES = {
    # shared chrome
    'df7ebff6458e964928d829b40ae92ec8587f6907': 'hero-cs2',
    '8c6cbc31237f6c95a81cf458d476cf86611ce45e': 'footer-logo',
    '30bc683682eed9d5942a3943760bab5840bac9fa': 'navbar-logo',
    '9b11dfcc9a06cb8089319431acb23777a39be36a': 'button-texture',
    '85428fe3bd7a262d1a70ca0f259b3bb60f41980c': 'button-leading',
    'cb94264127aa1e1e40a980bd73a116ac5efb420a': 'coin-fee',
    '6ef73d52818ac1c6d8ec97e9976c446b289b4213': 'coin-spca',
    # overview sidebar
    'c45d0969a314e492133b5a83119062dba34d5367': 'host-esl',
    '3e6b3cdc513c8bbcda5e0f033556c20c9b3da928': 'platform-1',
    '967fb9f35fdd6d62a0a253874b62ab5b04a50af4': 'platform-2',
    '01154c95d596f78ab8816c6964081d279f3d32ce': 'platform-3',
    '92fa9dec79885ebd3d033a7239a4a4de5465d777': 'platform-4',
    '26a0e028d72556655eda0d2bfac27a647c638bcf': 'platform-5',
    '1846a2e562c300dbd8d8b71568069677297bc19f': 'avatar-fallback',
    # prizes medals
    '08e54d8057ea058c9f8be37e55cbca8cda8e5c6e': 'medal-gold',
    'd8d23ef2a1cfc8755842a3b4b42ea4a090ed1242': 'medal-silver',
    '323b6907daa91e5eb0dc96ed3b7a50d0cd5adcbc': 'medal-bronze',
    # brackets
    '11e9bbe838fd729503d8862f328919fd5249ca9b': 'bracket-team-a',
    '1afcc8960a5227c803a29ae999b8f195164c8e25': 'bracket-team-b',
}

# participants grid, in Figma order
TEAM_REFS = [
    '0ff8bd96db257f6de67bfb3bd3e2c28b5c0e5b8f', 'cf6b63004cbb275e39847809b34b92a015984ae5',
    'acc376f852d509a3c6e54df72ee39ebea3dfa240', 'd2669cd20396a01708151880ec4ca5a01920ac98',
    '028b34ae33848a1ff4e4676177fa908728ccbb00', 'cde11d655602042440d78f614a3747236c725a34',
    '3fceac258b4ad6aec11d7535da032afcd34f81e6', 'bc3d510f82573d9c8a5514bfa035ba1905cc0e62',
    '71c0cb5ef5306bcbe251c7dbee44c1c0d0ae8cac', '0f6e3ac5cb2d2fdead23b394ad76f39b75e0f3e0',
    'fbb082b6f10b66a3553130e0092e16a925ef8494', '640b316d805b972728c0ac0f9b93d196a715bdca',
    'e5a027a6ea1766e0546867132007208eccf4fbc1', '4d7bb924405804174f7cfee5db4c269a53e1564b',
    '851e20d52681847c4ce7a072b2144835e70383b2', 'b0db81741ea9bd0446841da47bc7f7e41749f6f9',
    '29643c049cbfa27e2085d267c6acfa1613002b98', 'b9af81ee2608612fa050d3ad359c3cb49b858b05',
]
for i, ref in enumerate(TEAM_REFS, 1):
    NAMES[ref] = 'team-%02d' % i

SIG = {b'\x89PNG': '.png', b'\xff\xd8\xff': '.jpg', b'GIF8': '.gif', b'RIFF': '.webp'}

def ext_for(data):
    for sig, e in SIG.items():
        if data.startswith(sig):
            return e
    if data[:5] == b'<?xml' or data[:4] == b'<svg':
        return '.svg'
    return '.png'

def main():
    urls = json.load(open('imagefills.json'))['meta']['images']
    os.makedirs(OUT, exist_ok=True)
    manifest = {}
    for ref, name in NAMES.items():
        url = urls.get(ref)
        if not url:
            print('MISSING url for', ref, name)
            continue
        data = urllib.request.urlopen(url, timeout=90).read()
        fn = name + ext_for(data)
        with open(os.path.join(OUT, fn), 'wb') as fh:
            fh.write(data)
        manifest[name] = fn
        print('%-18s %-20s %8d bytes' % (name, fn, len(data)))
    json.dump(manifest, open('fill-manifest.json', 'w'), indent=1)
    print('downloaded', len(manifest), 'of', len(NAMES))

main()
