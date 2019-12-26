var ctx = {};

//hook(
//0x158CB00
//,{
//    onEnter: function(args){
//        console.log('sponhit1: '+args[0]);
//        console.log('sponhit2: '+args[1]);
//        console.log('sponhit3: '+args[2]);
//    }
//});


//hook( 
//offset.damagecalculation.calculation
//, {
//    onEnter: function(args){
//        this.tis = args[0];
//        this.attr = args[1];
//        this.dst = args[2];
//        var coef = this.attr.add(
//            offset.damagecalculation.coef
//            ).readFloat();
//        console.log('dmgcoef: '+coef);
//    },
//    onLeave: function(ret){
//    }
//});

hook(
offset.damagecalculation.calculationbasedamage
,{  //DamageCalculation$$CalculationBaseDamage
    onEnter: function(args){
    },
    onLeave: function(retval){
        console.log('basedmg: '+p2f(retval));
        //retval.replace(f2i(10000.0));
    }
});


hook(
0x017da774
,{  //DamageCalculation$$CalculationBaseDamage
    onEnter: function(args){
    },
    onLeave: function(retval){
        console.log('gethitattrdc: '+p2f(retval));
    }
});

if(1){
hook(
offset.damagecalculation.calculation
, {
    onEnter: function(args){
        //console.log('calc start');
        this.tis = args[0];
        this.attr = args[1];
        this.dst = args[2]
        var coef = this.attr.add(
            offset.damagecalculation.coef
            ).readFloat();
        console.log('dmgcoef: '+coef);

    },
    onLeave: function(retval){
        //console.log('calc end');

        var o_ds = offset.damagestatus;
        var o_dc = offset.damagecalculation;
        var o_cha = offset.collisionhitattribute;

        var p_ds = follow(this.tis, o_dc.normal); //damagestatues normal

        var dmg = p_ds.add(o_ds.value);

        //cb = follow(this.attr,0x24); //characterbase owner
        //ct = cb.add(0xb8).readInt(); //charactertype
        var ct = this.attr.add(o_cha.charactertype).readInt();

        var damage = dmg.readInt() ; //value
        var iscrit = p_ds.add(o_ds.iscrit).readU8()
        var cha = this.attr // collisionhitattribute
        if(ct==0){
            console.log('dmg: '+damage);
        }
    }
});
}


if(1){
hook(
offset.characterbase.get_attack
,{
    onEnter: function(args){
    },
    onLeave: function(retval){
        //var bt = Thread.backtrace(this.context)
        //for (var i in bt){
        //    bt[i] = ptr(bt[i]).add(-ilbase);
        //}
        //console.log(bt);
        var bt = Thread.backtrace(this.context)
        var cb_ga = ilbase.add(
            offset.characterbase.ret.get_attack_2_dc_cbd
        ).toString();
        if (bt[0].toString() == cb_ga) {
            console.log('\nget_atk: '+retval.toInt32());
        }
    }
});
}


if(1){
hook(
offset.characterbase.recoverysp
,{
    onEnter: function(args){
        //var bt = Thread.backtrace(this.context);
        //for (var i in bt){
        //    console.log('bt resp:'+ptr(bt[i]).add(0-ilbase));
        //}
        //console.log(bt);
        console.log('** sp: '+args[1].toInt32());
        //this.context.x1 = 20000;
    },
    onLeave: function(retval){
    }
});
}


if(0){
hook(
offset.characterbase.getmaxsp // getmaxsp
, {
    onEnter: function(args){
        this.tis = args[0];
        this.idx = args[1];
    },
    onLeave: function(ret){
        console.log('getmaxsp: '+this.idx+':'+ret);
    }
});
}



//hook(
//offset.collisionhitattribute.get_damageadjustment
//,{  // DamageCalculation$$GetHitAttributeDependentCoefficient
//    onEnter: function(args){
//        var tis = args[0];
//        var coef = tis.add(0xec).readFloat();
//        console.log('dmgcoef: '+coef);
//    },
//    onLeave: function(ret){
//    }
//});

//
//hook(0x00b1be2c,{  // CollisionHitAttribute$$get_ToBreakDmgRate
//    onEnter: function(args){
//    },
//    onLeave: function(ret){
//            console.log('toOdRate: '+p2f(ret));
//    }
//});


//hook(0x00cfec0c,{  // get_chainnum
//    onEnter: function(args){
//    },
//    onLeave: function(ret){
//        hits = 30;
//        //console.log('get_chainnum:'+ret+'->'+hits)
//        ret.replace(hits);
//    }
//});


if(0){  // control crit
hook(
offset.random.randomrangeint
,{  //random$$range (int)
    onEnter: function(args){
        var bt = Thread.backtrace(this.context);
        var dc_cbd = ilbase.add(
            offset.random.ret.rangeint_2_dc_cbd
        ).toString();
        var cbuf_ac  = ilbase.add(
            offset.random.ret.rangeint_2_cb_ac
        ).toString();  //characterbuff applycommon
        //var pc_sas  = ilbase.add(0x0181f198).toString(); //setactionskill

        var caller = bt[0].toString()
        if (caller == dc_cbd) {
            this.dc_cbd = 1;
            //console.log('->->->->');
            //console.log('//////rangeint in calculatebasedamage');
            //console.log(args[0]);
            //console.log(args[1]);
        } else if (caller == cbuf_ac){
            this.cbuf_ac = 1;

        } else if (caller == pc_sas){
            this.pc_sas = 1;
        }
        else{
            //console.log('rrii else:'+ptr(bt[0]).add(0-ilbase));
        }
    },
    onLeave: function(ret){
        if (this.dc_cbd ) {
            console.log('rrii dc_cbd: '+ret);
            ret.replace(95);
        }
        if (this.cbuf_ac ) {
            console.log('rrii cb_ac: '+ret);
            ret.replace(99);
        }
        //if (this.pc_sas ) {
        //    console.log('rrii pc_sas: '+ret);
        //    ret.replace(95);
        //}
    }
});
}

if(1){
hook(
offset.random.rangefloat
,{  //random$$range float
    onEnter: function(args){
        this.spread = 0;
        var bt = Thread.backtrace(this.context)
        var dc_c = ilbase.add(
            offset.random.ret.rangefloat_2_dc_calculation
        ).toString();

        if (bt[0].toString() == dc_c) {
            var p1 = ptr(this.context.sp-128-16);
            var p2 = ptr(this.context.sp-128);
            //console.log('p1:'+p1.readFloat());
            //console.log('p2:'+p2.readFloat());
            p1.writeInt(0x3f800000);
            p2.writeInt(0x3f800000);
            console.log('replace randomfloat');

          //  console.log("dc_c");
          //  //for (var i in this.context) {
          //  //    console.log(i+":"+this.context[i]);
          //  //}
            //var fp = ptr(this.context.fp);
           // console.log("sp");
           // var sp = ptr(this.context.sp-128-16);
           // var sp = ptr(this.context.sp-256);
           // console.log(sp.readByteArray(256));
        }
        else{
            //console.log('rrf else:'+ptr(bt[0]).add(0-ilbase));
        }
    },
    onLeave: function(ret){
    }
});
}


if(1){
    // CharacterBase$$IsInvincibleOnHitCheck
    hook(offset.characterbase.isinvincibleonhitcheck, { 
        onEnter: function(args){
            var o_cb = offset.characterbase;
            var o_cha = offset.collisionhitattribute;

            var cb = args[0];          //characterbase owner
            var p_ct = cb.add(o_cb.charactertype); 
            var ct = p_ct.readInt();   //charactertype
            this.ct = ct;

            var cha = args[1];
            var ahet = cha.add(o_cha.actionhitexectype).readInt();
            this.ahet = ahet;
            //console.log('actionhitexectype: '+ahet);
        },
        onLeave: function(ret){
            if(this.ct == 0){
                if(this.ahet == 1){
                    ret.replace(1);
                }
            }
        }
    });
}


if(0){
    hook(
    offset.enemyctrl.setaiaction
    ,{
        onEnter: function(args){
            //console.log('onEnter:'+args[0]); //+args[0]);
            this.context.x1 = 0;
        },
        onLeave: function(ret){
        }
    });
}
