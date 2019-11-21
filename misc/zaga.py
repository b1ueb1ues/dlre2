import frida, sys
import struct


def on_message_common(message, data):
    if message['type'] == 'send':
        msg = message['payload']
        if data == 'float':
            b = int(msg,16)
            print 'float:',b2f(b)
        elif data == 'stderr':
            sys.stderr.write("[*] {0}\n".format(message['payload']))
        else:
            print("[*] {0}".format(message['payload']))
    else:
        print(message)


def run(jsname, on_message=None):
    if not on_message :
        on_message = on_message_common
    procname = 'a.out'

    device = frida.get_local_device()
    pid = device.spawn('a.out')
    process = device.attach(pid)

    jscode = open(jsname).read()
    script = process.create_script(jscode)
    script.on('message', on_message)
    sys.stderr.write('[*] Running %s\n==============================\n'%jsname)
    script.load()

    device.resume(pid)
    sys.stdin.read()

run('_test.js')
