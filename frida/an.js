var c = 1;

var ctx = {};

function showresist(resists){
        var poi = resists.add(0x20+1*4).readFloat();
        var bur = resists.add(0x20+2*4).readFloat();
        var fre = resists.add(0x20+3*4).readFloat();
        var par = resists.add(0x20+4*4).readFloat();
        var dar = resists.add(0x20+5*4).readFloat();
        var stu = resists.add(0x20+6*4).readFloat();
        var cur = resists.add(0x20+7*4).readFloat();
        var reb = 0;
        var bog = resists.add(0x20+9*4).readFloat();
        var sle = resists.add(0x20+10*4).readFloat();
        console.log('poi: '+poi);
        console.log('bur: '+bur);
        console.log('fre: '+fre);
        console.log('par: '+par);
        console.log('dar: '+dar);
        console.log('stu: '+stu);
        console.log('cur: '+cur);
        console.log('bog: '+bog);
        console.log('sle: '+sle);
}

//CharacterBase$$SetAbnormalStatus
hook(offset.characterbase.setabnormalstatus,{
    onEnter: function(args){
        var tis = args[0];
        var attr = args[1];
        var condi = args[2];
        var dmg = args[3];
        ctx.setabs = 1;
        console.log('in setab');
        //console.log(condi);
        //fun = tis.readPointer().add(0x3ac);
        //console.log(fun);
        //console.log(fun-ilbase);

        /*start set resist*/
        var cparam = follow(tis,
            offset.characterbase.characterparameter
        );
        var paramtotal = follow(cparam,
            offset.characterparameter.fptotal
        );
        var resists = follow(paramtotal,
            offset.fluctuationparameter.abnormalresist
        );
        //console.log(resists.add(0x10).readByteArray(11*4));
        showresist(resists);
        // none poison burn freeze:3 para dark swoon curse:7 rebirth slowmove sleep:10 11
        //type = 9; 
        //resist = resists.add(0x10+type*4);
        //resist.writeFloat(0.3);
    },
    onLeave: function(retval){
        ctx.setabs = 0;
        console.log('out setab');
        //console.log(this.context.s16)
    }
});

//ActionConditionElement$$get_Rate
hook(offset.actionconditionelement.get_rate, {
    onEnter: function(args){
        this.type = ptr(args[0]).add(0x14).readS32();
        switch (this.type) {
            case 0:
                this.typestr = 'none';
                break;
            case 1:
                this.typestr = 'poison';
                break;
            case 2:
                this.typestr = 'burn';
                break;
            case 3:
                this.typestr = 'freeze';
                break;
            case 4:
                this.typestr = 'paralysis';
                break;
            case 5:
                this.typestr = 'darkness';
                break;
            case 6:
                this.typestr = 'stun';
                break;
            case 7:
                this.typestr = 'curse';
                break;
            case 8:
                this.typestr = 'rebirth';
                break;
            case 9:
                this.typestr = 'slowmove';
                break;
            case 10:
                this.typestr = 'sleep';
                break;
            case 99:
                this.typestr = 'all';
                break;
            default:
                this.typestr = 'null';
        } 
    },
    onLeave: function(retval){
        console.log('procrate: '+r2i(retval));
        console.log('proctype: '+this.typestr);
    }
});



if(0){
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

hook(
offset.characterbase.recoverysp
,{
    onEnter: function(args){
        console.log('** sp: '+args[1].toInt32());
        this.context.x1 = 20000;
    },
    onLeave: function(ret){
    }

});



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


