
var ctx = {};

var invincible = 1;
var attack = 0;
var attack = 10000;




hook(
offset.maingameleavealonechecker.setleavealonetime
,{
    onEnter: function(args){
        this.tis = args[0];
        console.log('setleavealone');
    },
    onLeave: function(retval){
        var tis = this.tis;
        tis.add(offset.maingameleavealonechecker.warnningtime)
            .writeFloat(100000);
        tis.add(offset.maingameleavealonechecker.exittime)
            .writeFloat(100000);
    }
});

if(attack){ 
    // CharacterBase$$get_attack
    hook(offset.characterbase.get_attack, { 
        onEnter: function(args){
            var cb = args[0];

            var o_cb = offset.characterbase;
            //o_cha = offset.collisionhitattribute;
            //o_ci = offset.characterid;

            var ct =     cb.add(  o_cb.charactertype           ).readInt(); 
            //ci =     cb.add(  o_cb.characterid             ).readInt(); 
            //dpi =    cb.add(  o_cb.dungeonpartyindex       ).readInt(); 
            //dpp =    cb.add(  o_cb.dungeonpartyposition    ).readInt(); 
            //p_mpid = cb.add(  o_cb.multiplayid             ).readPointer(); 
            //if (p_mpid != 0){
            //    aid = p_mpid.add( o_ci.actorid  ).readU8(); 
            //    idx = p_mpid.add( o_ci.index    ).readU8(); 
            //}
            //else{
            //    aid = -1;
            //    idx = -1;
            //}
            
            //from = ci+' ,[,'+ ct+','+dpi+','+dpp+','+aid+','+idx   +',]' ;
            //console.log(from);

            this.ct = ct
        },
        onLeave: function(retval){
            if(this.ct != 1){
                retval.replace(attack);
            }
            else{
                retval.replace(1);
            }
        }
    });
}

if(invincible){
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
            var ahet = cha.add(o_cha.actionhitexectype).readInt();  // actionhitexectype
            this.ahet = ahet;
            //console.log('actionhitexectype: '+ahet);
        },
        onLeave: function(retval){
            if(this.ct == 0){
                if(this.ahet == 1){
                    retval.replace(1);
                }
                else if(this.ahet == 6){
                    retval.replace(1);
                }
            }
        }
    });
}

