

def prepare():
    path_in = '../working/script.py'
    path_out = 'common/symbol.js'
    path_template = 'common/template.js'

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
