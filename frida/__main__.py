import sys
import zaga
from symbol import prepare as _prepare

default = 'gl'
prepare = 0


def main(mod, prepare=False):
    if len(sys.argv) > 1:
        mod = sys.argv[1]
    if len(sys.argv) > 2:
        prepare = True
    if '.js' not in mod:
        mod += '.js'
    if prepare:
        _prepare()
    zaga.run('%s'%mod)
    sys.stdin.read()

main(default, prepare)
