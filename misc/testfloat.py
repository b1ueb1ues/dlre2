import struct
import math

def main():
    b2f(0x3f4ccccd)
    b2f(0x3f99999A)
    f2b(0.8)
    f2b(1.2)
    exit()
    f2b(141.0)
    b2f(0x7f59985b40)
    b2f(0x7f59985480)
    b2f(0x3fc00000)
    b2f(0x3f866666)
    b2f(0x5f6087b)
    b2f(0x013af75)
    b2f(0x3ecccccc)
    b2f(0x3f266666)
    b2f(0x3f000000)
    b2f(0x3e19999a)
    b2f(0x3f933333)
    b2f(0x3fd9999a)
    b2f(0x3f99999a)
    b2f(0x3f19999a) #damageadjust
    b2f(0x3e99999a)
    b2f(0xbf800000)
    b2f(0x3dcccccd)
    b2f(0x3fa66666)
    b2f(0x3e99999a)
    b2f(0x4b31ae10)
    b2f(0x7eb89630)
    print('---------------')
    f2b(0.7)
    f2b(1.7)
    f2b(5/3.0)
    f2b(0.5)
    f2b(1.15)
    f2b(1.0)

def f2b(a):
    a = struct.pack('f',a)
    b = struct.unpack('4s',a)
    b = b[0]
    print('++++++++')
    print(b)
    print("0x%02x%02x%02x%02x"%(b[3],b[2],b[1],b[0]))

def d2b(a):
    a = struct.pack('d',a)
    b = struct.unpack('8s',a)
    b = b[0]
    print( "%02x%02x%02x%02x%02x%02x%02x%02x"%(ord(b[7]),ord(b[6]),ord(b[5]),ord(b[4]),ord(b[3]),ord(b[2]),ord(b[1]),ord(b[0])) )


def b2f(a):
    a = "%08x"%a
    s = [0,0,0,0]
    s[0] = chr(int(a[0:2],16))
    s[1] = chr(int(a[2:4],16))
    s[2] = chr(int(a[4:6],16))
    s[3] = chr(int(a[6:8],16))
    print('---------')
    s = "%s%s%s%s"%(s[3],s[2],s[1],s[0])
    print(s.encode())
    a = struct.pack('4s',s.encode('ascii'))
    b = struct.unpack('f',a)[0]
    print(b)

def b2d(a):
    a = "%016x"%a
    s = [0,0,0,0,0,0,0,0]
    s[0] = chr(int(a[0:2],16))
    s[1] = chr(int(a[2:4],16))
    s[2] = chr(int(a[4:6],16))
    s[3] = chr(int(a[6:8],16))
    s[4] = chr(int(a[8:10],16))
    s[5] = chr(int(a[10:12],16))
    s[6] = chr(int(a[12:14],16))
    s[7] = chr(int(a[14:16],16))
    s = "%s%s%s%s%s%s%s%s"%(s[7],s[6],s[5],s[4],s[3],s[2],s[1],s[0])
    a = struct.pack('8s',s)
    b = struct.unpack('d',a)[0]
    print(b)


main()
