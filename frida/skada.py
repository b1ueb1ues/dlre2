#!/usr/bin/env python3
# -*- encoding: utf8
# config ####################
DPSRANGE = 5

#############################
import zaga
import time
import sys
import re

skillname = {}
charaname = {}
enemyskill = {}
t0 = 0
fout = None
fpname = ''

def get_symbol():
    global skillname, charaname, enemyskill
    f = open('recount/textlabel.asset','rb')
    data = f.read().decode()
    tmp = re.findall(r'CHARA_NAME_(\d+)".\n.*_Text = "(.*)"', data)
    for i in tmp:
        charaname[i[0]] = i[1]
    tmp = re.findall(r'CHARA_NAME_COMMENT_(\d+)".\n.*_Text = "(.*)"', data)
    for i in tmp:
        charaname[i[0]] = i[1].replace(' ','') \
                .replace('（','(') \
                .replace('）',')') \
                .replace('Ver.','') \
                .replace('限定','')

    tmp = re.findall(r'SKILL_NAME_(\d+)".\n.*_Text = "(.*)"', data)
    for i in tmp:
        skillname[i[0]] = i[1]
    tmp = re.findall(r'ENEMY_SKILL.*_(\d+)".\n.*_Text = "(.*)"', data)
    for i in tmp:
        enemyskill[i[0]] = i[1]
    f.close()

class Nilds(object):
    def dps_total(this):
        return 0
    def dps_current(this):
        return 0

class Ds(object):
    global DPSRANGE
    dpsrange = DPSRANGE
    def __init__(this, name=''):
        global t0
        this.name = name
        this.sum = 0
        this.cur = 0
        this.timedmg = [(0,0)]
        this.t0 = t0
        this.dt = 0

    def add(this, timenow ,dmg):
        this.sum += dmg
        this.cur += dmg
        this.dt = timenow - this.t0
        this.timedmg.append((this.dt, dmg))
        #while this.timedmg[0][0] < this.dt-this.dpsrange:
        #    this.cur -= this.timedmg.pop(0)[1]

    def refresh(this, timenow):
        dt = timenow - this.t0
        this.timedmg.append((dt, 0))
        while this.timedmg[0][0] < dt-this.dpsrange:
            this.cur -= this.timedmg.pop(0)[1]

    def dps_total(this):
        if this.dt <= 0:
            return '0'
        return '%d'%(this.sum / this.dt)

    def dmg_sum(this):
        if this.dt <= 0:
            return '0'
        return '%d'%(this.sum)

    def dps_current(this):
        #if this.dt <= this.dpsrange:
        #    return '0'
        return '%d'%(this.cur/this.dpsrange)
        #if(this.dt-this.timedmg[0][0]==0):
        #    return this.cur / this.dpsrange
        #return this.cur / (this.dt-this.timedmg[0][0])

class Team(object):
    def __init__(this):
        global t0
        this.t0 = t0
        this.member = {}
        this.midx = []

    def add(this, timenow, idx, dmg, name=''):
        if idx < -9:
            idx = -10 - idx
        if idx not in this.member:
            this.midx.append(idx)
            this.member[idx] = Ds(name)
        this.member[idx].add(timenow, dmg)
        for i in this.member.values():
            i.refresh(timenow)
        this.dt = timenow - this.t0

    def dps_total(this):
        ret = ',dps_total:{'
        n = 5
        for i in this.midx:
            n -= 1
            ret += ','+this.member[i].dps_total()
        while n:
            n -= 1
            ret += ', '
        ret += ',}'
        return ret

    def timing(this):
        return ',t:{,%.2f,}'%(this.dt)

    def dmg_sum(this):
        ret = ',dmg_sum:{'
        n = 5
        for i in this.midx:
            n -= 1
            ret += ','+this.member[i].dmg_sum()
        while n:
            n -= 1
            ret += ', '
        ret += ',}'
        return ret

    def dps_current(this):
        ret = ',dps_cur:{'
        n = 5
        for i in this.midx:
            n -= 1
            ret += ','+this.member[i].dps_current()
        while n:
            n -= 1
            ret += ', '
        ret += ',}'
        return ret
    
    def dps_src(this):
        ret = ',['
        for i in this.midx:
            ret += ' '+this.member[i].name
        ret += ']'
        return ret


def reset():
    global fout, fpname
    if fpname:
        fbasename, ext = os.path.splitext(fpname)
        if not ext or ext=='':
            ext = '.csv'
        count = 1
        fname = fbasename + '.0'
        while os.path.exists(fname+ext):
            fname = fbasename + '.%s'%count
            count += 1
        fout = open(fname+ext, 'wb')
    else:
        fout = None


def fwrite(f, string):
    f.write(string.encode('utf8'))

teams = {}
def on_message(message, data):
    global teams
    global t0
    global skillname, charaname, enemyskill
    global fout
    if message['type'] == 'send':
        if data == '1' or data == b'1':
            t0 = int(message['payload'])
            t0 = t0 / 10000 / 1000 + 3
            teams = {}
            return
        if data == '0' or data == b'0':
            reset()
            if fout:
                fwrite(fout, message['payload']+'\n')
            else:
                print(message['payload'])
            return
        if data == 'stderr' or data == b'stderr':
            sys.stderr.write("[*] {0}\n".format(message['payload']))
            return
        #p = "{0}".format(message['payload'])
        p = message['payload']
        line = p.split(',')
        tn = int(line[0])/10000/1000
        srcid = line[2].strip()
        if srcid in charaname:
            cname = charaname[srcid]
        else:
            cname = ''
        if srcid == '-1':
            cname = 'dot'

        dmg = int(line[-1])
        teamno = line[5]
        dst = line[10]
        dstid = dst[2:].split(':')[0]
        teamdst = teamno+dst
        actionid = line[11][1:-1]
        skillid = line[12][1:-1]

        inteamno = line[7]+line[6]

        #dp = line[5]+line[6]+line[7]+line[8]
        if teamdst not in teams:
            teams[teamdst] = Team()

        t = teams[teamdst]
        t.add(tn, int(inteamno), dmg, cname)

        tmp = ', '

        tmp += ','
        tmp += cname
        if dstid in charaname:
            tmp += ' '+charaname[dstid]
        if skillid in skillname:
            tmp += ' '+skillname[skillid]
        if actionid in enemyskill:
            tmp += ' '+enemyskill[actionid]

        timing = t.timing()
        cur = t.dps_current()
        total = t.dps_total()
        _sum = t.dmg_sum()
        src = t.dps_src()

        tmp += timing
        tmp += _sum
        tmp += cur
        tmp += total
        tmp += src

        tmp += ',team['+teamno+']:{'
        for k in t.midx:
            tmp += ' %02d'%(k)
        tmp += '}'

        p += tmp
        if fout:
            fwrite(fout, p+'\n')
        else:
            print(p)
        #debug{
        sys.stderr.write(src+timing+total+_sum+'\n')
        #}debug
    else:
        print(message)

if __name__ == '__main__':
    import os
    if len(sys.argv) > 1:
        fpname = sys.argv[1]
    else:
        fpname = None

    get_symbol()
    reset()
    zaga.run('skada.js', on_message, keep=False)
    while 1:
        input()
        sys.stderr.write('reset\n')
        fout.close()
        fout = None


