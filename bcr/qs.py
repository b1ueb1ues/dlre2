class unit() :
    def __init__(this, i, v):
        this.i = i
        this.v = v
    def __repr__(this):
        return str(this.i)

def qs(a, lo, hi):
    if lo < hi :
        p = part(a, lo, hi)
        qs(a, lo, p-1)
        qs(a, p+1, hi)

def part(a, lo, hi):
    pivot = a[hi]
    i = lo
    for j in range(lo, hi):
        if a[j].v < pivot.v:
            a[j],a[i] = a[i],a[j]
            i += 1
    a[i],a[hi] = a[hi],a[i]
    return i


def main(c): 
    A = []
    idx = 1
    for i in c:
        A.append(unit(idx, i))
        idx += 1

    a = A[:5]
    qs(a,0,4)
    print(a)

if __name__ == '__main__':
    c = [0,0,0,0,0]
    main(c)

    c = [0,1,1,1,1]
    main(c)

    c = [1,0,1,1,1]
    main(c)

    c = [1,1,0,1,1]
    main(c)

    c = [1,1,1,0,1]
    main(c)

    c = [1,1,1,1,0]
    main(c)

    c = [1,0,1,0,1]
    main(c)
