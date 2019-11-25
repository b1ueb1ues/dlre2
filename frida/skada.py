import zaga
import time
import sys


t0 = 0


class Nilds(object):
    def dps_total(this):
        return 0
    def dps_current(this):
        return 0

class Ds(object):
    dpsrange = 5
    def __init__(this):
        global t0
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
        while this.timedmg[0][0] < this.dt-this.dpsrange:
            this.cur -= this.timedmg.pop(0)[1]

    def dps_total(this):
        if this.dt <= 0:
            return '0'
        return '%d'%(this.sum / this.dt)

    def dps_current(this):
        if this.dt <= this.dpsrange:
            return '0'
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

    def add(this, timenow, idx, dmg):
        if idx < 0:
            idx = -10 - idx
        if idx not in this.member:
            this.midx.append(idx)
            this.member[idx] = Ds()
        this.member[idx].add(timenow, dmg)
        this.dt = timenow - this.t0

    def dps_total(this):
        ret = ',{'
        n = 5
        for i in this.midx:
            n -= 1
            ret += ','+this.member[i].dps_total()
        while n:
            n -= 1
            ret += ', '
        ret += ',}'
        return ret

    def dps_current(this):
        ret = ',(,%.2f,):[,'%(this.dt)
        n = 5
        for i in this.midx:
            n -= 1
            ret += ','+this.member[i].dps_current()
        while n:
            n -= 1
            ret += ', '
        ret += ',]'
        return ret



teams = {}
def on_message(message, data):
    global teams
    global t0
    if message['type'] == 'send':
        if data == 'stderr':
            sys.stderr.write("[*] {0}\n".format(message['payload']))
            t0 = time.time()
            teams = {}
            return
        if not t0:
            t0 = time.time()-1
        p = "%s, {0}".format(message['payload'])
        tn = time.time()
        p = p%(tn)
        line = p.split(',')
        dmg = int(line[-1])
        teamno = line[5]
        dst = line[10]
        teamdst = teamno+dst

        if line[7]==255 :
            inteamno = line[7]
        else:
            inteamno = line[7]+line[6]

        #dp = line[5]+line[6]+line[7]+line[8]
        if teamdst not in teams:
            teams[teamdst] = Team()

        t = teams[teamdst]
        t.add(tn, int(inteamno), dmg)

        tmp = ','+teamno+':'
        for k in t.midx:
            tmp += ' %02d'%(k)

        tmp += t.dps_current()
        tmp += t.dps_total()

        p += tmp
        print(p)
        #debug{
        sys.stderr.write(p+'\n')
        #}debug
    else:
        print(message)


zaga.run('skada.js', on_message)