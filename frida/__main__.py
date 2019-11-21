import sys
import zaga

default = 'skada'
prepare = 0


def main(mod, prepare):
    if len(sys.argv) > 1:
        mod = sys.argv[1]
    if len(sys.argv) > 2:
        prepare = True
    if '.js' not in mod:
        mod += '.js'
    zaga.run('%s'%mod, None, prepare)

main(default, prepare)
