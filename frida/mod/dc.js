var ctx = {};

gl.sp();
//gl.invincible();
gl.dummy();
if(0){
hook(
offset.damagecalculation.calculationbasedamage
,{  //DamageCalculation$$CalculationBaseDamage
    onEnter: function(args){
    },
    onLeave: function(retval){
        console.log('basedmg: '+p2f(retval));  //use s register lead to 0 return
        //retval.replace(f2i(10000.0));
    }
});
}


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
        console.log('\ndmgcoef: '+coef);

    },
    onLeave: function(retval){
        //console.log('calc end');

        var o_ds = offset.damagestatus;
        var o_dc = offset.damagecalculation;
        var o_cha = offset.collisionhitattribute;


        var p_ds = arrow(this.tis, o_dc.normal); //damagestatues normal

        var dmg = p_ds.add(o_ds.value);

        //cb = arrow(this.attr,0x24); //characterbase owner
        //ct = cb.add(0xb8).readInt(); //charactertype
        var ct = this.attr.add(o_cha.charactertype).readInt();


        var damage = dmg.readInt() ; //value
        var iscrit = p_ds.add(o_ds.iscrit).readU8()
        var cha = this.attr // collisionhitattribute
        if(ct==0){
            console.log('dmg: '+damage);
        } 
        else if (1) {
            dmg.writeInt(0);
            //var _id = this.attr.add(0xb8).readPointer();
            //console.log(hexdump(_id));
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
        var bt = Thread.backtrace(this.context)
        var cb_ga = lib_base.add(
            offset.characterbase.ret.get_attack_2_dc_cbd
        ).toString();
        if (bt[0].toString() == cb_ga) {
            console.log('get_atk: '+retval.toInt32());
        }
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


if(1){  // control crit
hook(
offset.random.randomrangeint
,{  //random$$range (int)
    onEnter: function(args){
        var bt = Thread.backtrace(this.context);
        var dc_cbd = lib_base.add(
            offset.random.ret.rangeint_2_dc_cbd
        ).toString();
        var cbuf_ac  = lib_base.add(
            offset.random.ret.rangeint_2_cb_ac
        ).toString();  //characterbuff applycommon
        //var pc_sas  = lib_base.add(0x0181f198).toString(); //setactionskill

        var caller = bt[0].toString()
        if (caller == dc_cbd) {
            this.dc_cbd = 1;
            //console.log('->->->->');
            //console.log('//////rangeint in calculatebasedamage');
            //console.log(args[0]);
            //console.log(args[1]);
        } else if (caller == cbuf_ac){
            this.cbuf_ac = 1;

        //} else if (caller == pc_sas){
        //    this.pc_sas = 1;
        //
        } else{
            //console.log('r:rri else:'+ptr(bt[0]).add(0-lib_base));
        }
    },
    onLeave: function(ret){
        if (this.dc_cbd ) {
            console.log('r:rri dc_cbd: '+ret);
            ret.replace(95);
        }
        if (this.cbuf_ac ) {
            console.log('r:rri cb_ac: '+ret);
            ret.replace(99);
        }
        //if (this.pc_sas ) {
        //    console.log('r:rri pc_sas: '+ret);
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
        var dc_c = lib_base.add(
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
            //console.log('rrf else:'+ptr(bt[0]).add(0-lib_base));
            //var p1 = ptr(this.context.sp-128-16);
            //var p2 = ptr(this.context.sp-128);
            //p1.writeInt(0x3f800000);
            //p2.writeInt(0x3f800000);
        }
    },
    onLeave: function(ret){
    }
});
}


if(0){
hook(
offset.characterbufftriggerreactionbomb.execdebuffextradamage
,{
    onEnter: function(args) {
        var tis = args[0];
        var p_br = args[1];
        var damage = p_br.add(
            offset.buffrecord.damage
        ).readS32();
        var dst = p_br.add(
            offset.buffrecord.dst
        ).readPointer();
        var src = p_br.add(
            offset.buffrecord.src
        ).readPointer();

        var actioncontainer = tis.add(
            offset.characterbufftriggerreactionbomb.container
        ).readPointer();
        var actionid = actioncontainer.add(
            offset.actioncontainer.actionid
        ).readS32();
        
        this.attr = tis.add(0x28).readPointer();
        //var _id = this.attr.add(0xb8).readPointer();
        //console.log(hexdump(_id));
        var coef = this.attr.add(
            offset.damagecalculation.coef
            ).readFloat();
        console.log('\ndmgcoef: '+coef);
        console.log('cbtrb::eded', damage, 0, src, dst, actionid, 0);
    },
    onLeave: function(ret){
    }
});
}


