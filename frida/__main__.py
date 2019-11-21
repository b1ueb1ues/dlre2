import sys
import zaga

mod = 'skada'
prepare = 0

if len(sys.argv) > 1:
    mod = sys.argv[1]
if len(sys.argv) > 2:
    prepare = True

zaga.run('mod/%s.js'%mod, None, prepare)
