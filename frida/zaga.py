import frida, sys
import struct
import sys

def prepare():
    path_in = '../working/script.py'
    path_out = '0_symbol.js'
    path_template = '0_template.js'

    functions = []
    for i in open(path_in):
        if i[:10] != 'SetMethod(':
            continue
        end = i.find("')")
        i = i[10:end]
        an = i.strip().split(', \'')
        addr = an[0]
        name = an[1].strip()
        functions.append((name, addr))

    fout = open(path_out,'w')
    for line in open(path_template):
        if '#' in line:
            part = line.split('#')
            symbol = part[1].split(',')
            if len(symbol) == 1:
                name = symbol[0].replace('#','')
                name = name.strip()
                idx = 1
            elif len(symbol) == 2:
                name = symbol[0].replace('#','')
                name = name.strip()
                idx = int(symbol[1])
            else:
                raise
            for i in functions:
                if i[0] == name:
                    idx -= 1
                    if not idx:
                        lout = line.replace('#%s#'%part[1], i[1])
            if idx > 0 :
                raise # not found
            fout.write(lout)
        else:
            fout.write(line)

if __name__ == '__main__':
    prepare()


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

def on_message_common(message, data):
    if message['type'] == 'send':
        msg = message['payload']
        if data == 'float':
            b = int(msg,16)
            print('float:',b2f(b))
        elif data == 'stderr':
            sys.stderr.write("[*] {0}\n".format(message['payload']))
        else:
            print("[*] {0}".format(message['payload']))
    else:
        print(message)



headerline = 200

def run(jsname, on_message=None):
    global headerline
    if len(sys.argv) > 1:
        prepare()
    if not on_message :
        on_message = on_message_common
    procname = 'com.nintendo.zaga'
    process = frida.get_usb_device().attach(procname)
    commonjs = open('0_common.js').read()
    symboljs = open('0_symbol.js').read()
    lines = 0
    for i in commonjs:
        if i == '\n':
            lines +=1
    for i in symboljs:
        if i == '\n':
            lines +=1
    padding = '\n'*(headerline - lines - 1)
    padding += 'var __padding__ = 0;\n'


    jscode = open(jsname).read()
    
    jscode = commonjs + symboljs + padding + jscode

 #   print(jscode)
 #   ln = 0;
 #   for i in jscode.split('\n'):
 #       ln += 1
 #       print ln, i
 #   exit()
    script = process.create_script(jscode)
    script.on('message', on_message)
    sys.stderr.write('[*] Running %s\n==============================\n'%jsname)
    script.load()
    sys.stdin.read()
