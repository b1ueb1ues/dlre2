import frida, sys
import struct


jsname = 'photon.js'

def b2f(a):
    a = "%08x"%a
    s = [0,0,0,0]
    s[0] = chr(int(a[0:2],16))
    s[1] = chr(int(a[2:4],16))
    s[2] = chr(int(a[4:6],16))
    s[3] = chr(int(a[6:8],16))
    s = "%s%s%s%s"%(s[3],s[2],s[1],s[0])
    a = struct.pack('4s',s)
    b = struct.unpack('f',a)[0]
    return b


def on_message(message, data):
    if message['type'] == 'send':
        msg = message['payload']
        if data == 'float':
            b = int(msg,16)
            print 'float:',b2f(b)
        elif data == 'int':
            b = int(msg,16)
            print 'int:',b
        else:
            print("[*] {0}".format(message['payload']))
    else:
        print(message)

procname = 'com.nintendo.zaga'
process = frida.get_usb_device().attach(procname)
jscode = open(jsname).read()
print jscode
script = process.create_script(jscode)
script.on('message', on_message)
print('[*] Running %s\n==============================\n'%jsname)
script.load()
sys.stdin.read()
