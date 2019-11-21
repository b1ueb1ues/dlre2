
var tfloat = [0x66,0x6c,0x6f,0x61,0x74];
function follow(p,offset){
    p = p.add(offset);
    p = p.readPointer();
    return p
}
function readfloatret(r){
    myp = Memory.alloc(4);
    myp.writeInt(r.toInt32());
    return myp.readFloat();
}



var ilbase = Module.findBaseAddress('libil2cpp.so');
console.log('processid: '+Process.id);
console.log('ilbase: '+ilbase);

var randomreplace = 0;
var np = ilbase.add(0x6b88c4);  // DamageCalculation$$CalculationBaseDamage
Interceptor.attach(np, {
    onEnter: function(args){
        console.log('calcbase start');
        //send(args[4].add(0xc).readS8());
        //args[4].add(0xc).writeS8(1);
    },
    onLeave: function(retval){
        //for(var name in retval){
        //    console.log(name);
        //    console.log(retval[name]);
        //}
        r = retval.toString()
        console.log('basecalc: '+readfloatret(retval));
        console.log('calcbase end');
       // send(r,tfloat);
    }
});


//var randomreplace = 0;
//var np = ilbase.add(0xc511f0);  // 
//Interceptor.attach(np, {
//    onEnter: function(args){
//        console.log('onc start');
//        randomreplace = 1;
//    },
//    onLeave: function(retval){
//        console.log('onc end');
//        randomreplace = 0;
//    }
//});

np = ilbase.add(0x6b5d4c); //DamageCalculation$$Calculation
var tis = 0;
var attr = 0;
Interceptor.attach(np, {
    onEnter: function(args){
        console.log('calc start');
        tis = args[0];
        attr = args[1];
        randomreplace = 1;
    },
    onLeave: function(retval){
        randomreplace = 0;
        p = tis;
        p = follow(p,8); //dstatues normal
        dmg = p.add(0xc) ; //value
        cb = follow(attr,0x24); //characterbase owner
        cy = cb.add(0xb8); //charactertype
        cy = cy.readInt();
        acn = cb.add(0x24).readCString();
        ci = cb.add(0xa0).readInt();
        dpi = cb.add(0xa8).readInt();
        dpp = cb.add(0xac).readInt();
        console.log('['+ cy+":"+acn+':'+ci+':'+dpi+':'+dpp   +'] dmg: '+dmg.readInt());
        if(cy==0){
            //dmg.writeInt(0);
            console.log('replaceatt');
            dmg.writeInt(10000);
        }else{
            console.log('replacedt');
            dmg.writeInt(0);
        }
        console.log('calc end');
    }
});

np = ilbase.add(0x216fd48);  //random$$rangeInt
Interceptor.attach(np, {
    onEnter: function(args){
        //if(args[1]==0 && args[2]==100){
        //    this.replace = 1;
        //}
    },
    onLeave: function(retval){
        //if(this.replace){
        //    retval.replace(0);
        //    console.log('replace random');
        //}
        //randomreplace = 1;
        if(randomreplace){
            rp = 101;
            console.log('replace randomInt: '+retval.toInt32()+'->'+rp);
            retval.replace(rp);
        }
    }
});

//np = ilbase.add(0x216fd44);  //random$$range (int)
//Interceptor.attach(np, {
//    onEnter: function(args){
//        //if(args[1]==0 && args[2]==100){
//        //    this.replace = 1;
//        //}
//    },
//    onLeave: function(retval){
//        //if(this.replace){
//        //    retval.replace(0);
//        //    console.log('replace random');
//        //}
//        if(randomreplace){
//            rp = 1;
//            console.log('replace random(i,i): '+retval+'->'+rp);
//            retval.replace(rp);
//        }
//    }
//});




//np = ilbase.add(0x216fc9c);  //random$$range (float)
//Interceptor.attach(np, {
//    onEnter: function(args){
//        //if(args[1]==0 && args[2]==100){
//        //    this.replace = 1;
//        //}
//    },
//    onLeave: function(retval){
//        //if(this.replace){
//        //    retval.replace(0);
//        //    console.log('replace random');
//        //}
//        if(randomreplace){
//            rp = 0.99;
//            console.log('replace random(f,f): '+retval+'->'+rp);
//            retval.replace(rp);
//        }
//    }
//});
