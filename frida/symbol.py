functions = []
classes = {}

def prepare():
    path_in = '../working/script.py'
    path_cs = '../working/dump.cs'
    path_out = 'common/symbol.js'
    path_template = 'common/template.js'

    global classes
    global functions
    get_functions(path_in)
    get_classes(path_cs)

    fout = open(path_out,'w')
    for line in open(path_template):
        if '#' in line:
            lout = func(line)
        elif '@' in line:
            lout = var(line)
        else:
            lout = line
        print(lout.strip())
        fout.write(lout)

def get_classes(path_cs):
    global classes
    state = 0 # none
    for i in open(path_cs):
        if state == 0:
            if ' class ' in i or i[:6]=='class ':
                state = 1
                s = i.find('class')+6
                c = i[s:]
                e = c.find(' ')
                c = c[:e]
                classes[c] = []
        elif state == 1:
            if ')' in i or '}' in i:
                state = 0
                continue
            if 'RVA:' in i:
                continue
            tmp = i.split('//')
            if len(tmp) >= 2 :
                name = tmp[0].strip()
                addr = tmp[1].strip()
                if name != '':
                    nameaddr = (name, addr)
                    #print(nameaddr)
                    classes[c].append(nameaddr)
    return classes

def get_functions(path_in):
    global functions
    for i in open(path_in):
        if i[:10] != 'SetMethod(':
            continue
        end = i.find("')")
        i = i[10:end]
        an = i.strip().split(', \'')
        addr = an[0]
        name = an[1].strip()
        functions.append((name, addr))
    return functions

def func(line):
    global functions
    part = line.split('#')
    symbol = part[1].split(',')
    if len(symbol) == 1:
        name = symbol[0].strip()
        idx = 1
    elif len(symbol) == 2:
        name = symbol[0].strip()
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
    return lout

def var(line):
    global classes
    part = line.split('@')
    symbol = part[1].split(',')
    if len(symbol) == 2:
        classname = symbol[0].strip()
        varname = symbol[1].strip()
    else:
        raise
    for i in classes[classname]:
        if varname in i[0]:
            lout = line.replace('@%s@'%part[1], i[1])
    return lout


if __name__ == '__main__':
    prepare()
