class unit() :
    def __init__(this, i, v):
        this.i = i
        this.v = v
        this.debug = 0

    def __repr__(this):
        if this.debug:
            return str("%s(%s)"%(this.i, this.v))
        else:
            return str(this.i)

class sort() :
    def __init__(this, a):
        this.a = a

    def compare(this, x, y):
        if this.a[x].v > this.a[y].v:
            return 1
        if this.a[x].v == this.a[y].v:
            return 0
        if this.a[x].v < this.a[y].v:
            return -1

    def compare_r(this, x, y):
        if this.a[x].v < this.a[y].v:
            return 1
        if this.a[x].v == this.a[y].v:
            return 0
        if this.a[x].v > this.a[y].v:
            return -1

    def swap(this, x, y):
        this.a[x], this.a[y] = this.a[y], this.a[x]

    def sort(this, a, lo, hi):
        pass

    def __call__(this):
        this.sort(this.a, 0, len(this.a)-1)

class qs(sort):
    def sort(this, a, lo, hi):
        if lo < hi:
            pivot_index = this.partition(a, lo, hi)
            this.sort(a, lo, pivot_index)
            this.sort(a, pivot_index+1, hi)

    def partition(this, a, lo, hi):
        pivot = int((hi+lo)/2)
        i = lo
        j = hi
        while 1:
            while this.compare(i, pivot) < 0:
                i += 1
            while this.compare(j, pivot) > 0:
                j -= 1
            if i >= j :
                return j
            this.swap(i, j)
            i += 1
            j -= 1


def main(F, t): 
    A = []
    idx = len(t)
    for i in t:
        A.append(unit(idx, i))
        idx -= 1

    a = A[:5]
    f = F(a)
    f()
    print(a)

if __name__ == '__main__':

    t = [5,4,3,2,1]
    main(qs, t)
    t = [1,2,3,4,5]
    main(qs, t)

    print('===========')

    t = [1,1,1,1,1]
    main(qs, t)
    t = [1,1,1,1]
    main(qs, t)
    t = [1,1,1]
    main(qs, t)
    t = [1,1]
    main(qs, t)
    t = [1]
    main(qs, t)

    print('5-----------')
    t = [1,1,1,1,1]
    main(qs, t)
    t = [1,0,1,1,1]
    main(qs, t)
    t = [1,1,0,1,1]
    main(qs, t)
    t = [0,1,1,1,1]
    main(qs, t)

    print('4-----------')
    t = [1,1,1,1]
    main(qs, t)
    t = [1,0,1,1]
    main(qs, t)
    t = [0,1,1,1]
    main(qs, t)

    print('3-----------')
    t = [1,1,1]
    main(qs, t)
    t = [0,1,1]
    main(qs, t)
    t = [1,0,1]
    main(qs, t)

    print('2-----------')
    t = [1,1]
    main(qs, t)

    print('t-----------')
    t = [1,1,1,1,0]
    main(qs, t)
    t = [1,1,1,0]
    main(qs, t)
    t = [1,1,0]
    main(qs, t)

    print('p-----------')
    t = [3,3,2,2,1]
    main(qs, t)
