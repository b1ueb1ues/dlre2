/**
 * send t0 first
 */
send(get_time(),tone);

/**
 * skada start
 */
var invincible = 0;
var attack = 0;
var dummy = 0;

/**
 *  god like
 */
//attack = 5000;
//invincible = 1;
//dummy = 1;

if(attack){
    invincible = 1;
}


function at2name(at){
    var ab = ''
    if(at==0){
        ab = 'none'
    } else if(at==1){
        ab = 'poison'
    } else if(at==2){
        ab = 'burn'
    } else if(at==3){
        ab = 'freeze'
    } else if(at==4){
        ab = 'paralysis'
    } else if(at==5){
        ab = 'darkness'
    } else if(at==6){
        ab = 'swoon'
    } else if(at==7){
        ab = 'curse'
    } else if(at==8){
        ab = 'rebirth'
    } else if(at==9){
        ab = 'slowmove'
    } else if(at==10){
        ab = 'sleep'
    } else if(at==99){
        ab = 'all'
    }
    return ab
}

//send('self/team,[,ctype,::,cid,didx,dposition,multiplay_id,multiplay_index,],<actionid>,<skillid>,iscrit,dmg');
function recount(type, dmg, iscrit, cha, src, dst){
    var o_cb = offset.characterbase;
    var o_cha = offset.collisionhitattribute;
    var o_ci = offset.characterid;

    if (typeof(cha) === 'number'){
        var dot = 1;
    }else{
        var dot = 0;
    }

    if(dot){
        //cb = dst;
        var actionid = cha;
        var skillid =  at2name(cha);
    }else{
        var actionid = cha.add( o_cha.actionid  ).readInt();
        var skillid =  cha.add( o_cha.skillid   ).readInt();
    }

    if(src != 0){
        var cb = src;
    }else{
        if (!dot){
            var cb = follow(cha,  o_cha.owner );  
        }else{
            var cb = dst;
        }
    }

    var ct =     cb.add(  o_cb.charactertype           ).readInt(); 
    var ci =     cb.add(  o_cb.characterid             ).readInt(); 
    var dpi =    cb.add(  o_cb.dungeonpartyindex       ).readInt(); 
    var dpp =    cb.add(  o_cb.dungeonpartyposition    ).readInt(); 
    var p_mpid = cb.add(  o_cb.multiplayid             ).readPointer(); 
    
    if (p_mpid != 0){
        var aid = p_mpid.add( o_ci.actorid  ).readU8(); 
        var idx = p_mpid.add( o_ci.index    ).readU8(); 
    }
    else{
        var aid = -1;
        var idx = -1;
    }
    if (dot){
        dpp = 0;
        aid = 255;
    }
    //var from = '<'+ci+'>'+' ,[,'+ ct+','+dpi+','+dpp+','+aid+','+idx   +',]' ;
    var from = ci+' ,[,'+ ct+','+dpi+','+dpp+','+aid+','+idx   +',]' ;

    cb = dst
    ct =     cb.add(  o_cb.charactertype           ).readInt(); 
    ci =     cb.add(  o_cb.characterid             ).readInt(); 
    dpi =    cb.add(  o_cb.dungeonpartyindex       ).readInt(); 
    dpp =    cb.add(  o_cb.dungeonpartyposition    ).readInt(); 
    p_mpid = cb.add(  o_cb.multiplayid             ).readPointer(); 
    if (p_mpid != 0){
        aid = p_mpid.add( o_ci.actorid  ).readU8(); 
        idx = p_mpid.add( o_ci.index    ).readU8(); 
    }
    else{
        aid = -1;
        idx = -1;
    }
    //var to = '<'+ci+'>'+':['+ ct+'|'+dpi+'.'+dpp+'.'+aid+'.'+idx +']' ;
    var to = ci+':['+ ct+'|'+dpi+'.'+dpp+'.'+aid+'.'+idx +']' ;

    var skada = get_time()+','
    if(iscrit){
        skada += type+','+ from +',';
        skada += '->'+to+','
        skada += '<'+actionid+'>,<'+skillid+'>,critdmg: ,' + dmg;
    }else{
        skada += type+','+ from +',';
        skada += '->'+to+','
        skada += '<'+actionid+'>,<'+skillid+'>,dmg: ,' + dmg;
    }
    
    send(skada);
    //console.log(skada);
}


hook(
offset.maingamectrl.playqueststart,
{
    onEnter: function(args){
        send(get_time(),tone);
        send('quest_start\n==============================', tstderr);
        s = 'timestamp,self/other,cid,[,ctype,didx,dposition,multiplay_id,multiplay_index,],dst,<actionid>,<skillid>,iscrit,dmg,-,who:,'
        s += '-,-,-,-,-,-,-,-,-,-,-,-,-,-,-,-,-,-,-,-,-,-,-,-,-,-,-,-,-,-,-,-,-,-,-'
        send(s, tzero);
       // tis = args[0]
       // igtime = follow(tis, 0x13c)
       // sfdt = igtime.add(0x8).readFloat();
       // gsr = 1
       // gsr = igtime.add(0x24).readInt();
       // if(gsr==0){gsr = '1'}
       // else if(gsr==1){gsr = '1.2';}
       // else if(gsr==2){gsr = '1.5';}
       // else if(gsr==3){gsr = '2.0';}
       // else {gsr = '0';}
       // console.log('timer: '+sfdt+'('+gsr+')');
    },
    onLeave: function(retval){
    }
});

// afk
hook(offset.maingameleavealonechecker.setleavealonetime, {
    onEnter: function(args){
        this.tis = args[0];
        send('unsetleavealone',tstderr);
        //console.log('setleavealone');
    },
    onLeave: function(retval){
        var tis = this.tis;
        tis.add(offset.maingameleavealonechecker.warnningtime).writeFloat(100000);
        tis.add(offset.maingameleavealonechecker.exittime).writeFloat(100000);
    }
});

//characterbase$$applyslipdamage
hook(offset.characterbase.applyslipdamage, {
    onEnter: function(args){
        var dst = args[0];
        var src = args[1];
        var dmg = args[2];
        var abt = args[3];

        var at = abt.toInt32();
        var damage = dmg.toInt32();

        recount('cb::apsd',damage,0,at,src,dst);
    },
    onLeave: function(retval){
        retval.replace(attack);
    }
});

//CharacterBase$$ApplyDamage
hook(offset.characterbase.applydamage, {
    onEnter: function(args){
        //console.log('cb::ad');
        var o_ah = offset.attackhit;
        var o_cdi = offset.characterdamageintermediate;

        var tis = args[0];
        var cdi = args[1];
        var attackhit = cdi.add( o_cdi.attackhit ).readPointer();
        // console.log('ah: '+attackhit);
        // console.log(hexdump(attackhit,20));

        var cha = cdi.add( o_cdi.collisionhitattribute ).readPointer(); // collisionhitattribute
        //src = cdi.add(o_cdi.damageowner); //characterbase from

        //damage = attackhit.add(  o_ah.damage  ).readInt();
        var damage = cdi.add(  o_cdi.damage ).readInt();
        var iscrit = attackhit.add(  o_ah.iscrit  ).readU8();
        recount('cb::admg',damage,iscrit,cha,0,tis);
    },
    onLeave: function(retval){
    }
});

//hook(0xF279F8, {
//    onEnter: function(args){
//        console.log('formatter');
//    },
//    onLeave: function(ret){
//    }
//});
//
////DamageCalculation$$Calculation
//hook(offset.damagecalculation.calculation, {
//    onEnter: function(args){
//        //console.log('calc start');
//        this.tis = args[0];
//        this.attr = args[1];
//        this.dst = args[2]
//    },
//    onLeave: function(retval){
//        //console.log('calc end');
//
//        o_ds = offset.damagestatus;
//        o_dc = offset.damagecalculation;
//        o_cha = offset.collisionhitattribute;
//
//        p_ds = follow(this.tis, o_dc.normal); //damagestatues normal
//
//        dmg = p_ds.add(o_ds.value);
//
//        //cb = follow(this.attr,0x24); //characterbase owner
//        //ct = cb.add(0xb8).readInt(); //charactertype
//        ct = this.attr.add(o_cha.charactertype).readInt();
//
//        damage = dmg.readInt() ; //value
//        iscrit = p_ds.add(o_ds.iscrit).readU8()
//        cha = this.attr // collisionhitattribute
//        if(ct==0){
//            recount('dc::calc',damage,iscrit,cha,0,this.dst);
//        }
//
//        // cheat
//        if(gl){
//            if(ct==0){
//                newdmg = gl;
//                //console.log('replaceatt '+dmg.readInt()+'->'+newdmg);
//                dmg.writeInt(newdmg);
//            }else{
//                //console.log('replacedt '+dmg.readInt()+'->0');
//                dmg.writeInt(0);
//            }
//        }
//    }
//});
//
//
////EnemyCharacter$$OnDamaged
//hook(offset.enemycharacter.ondamaged, {
//    onEnter: function(args){
//        o_ah = offset.attackhit;
//        tis = args[0];
//        attackhit = args[1];
//        //cb = args[3]; //characterbase from
//
//        damage = attackhit.add(  o_ah.damage  ).readInt();
//        iscrit = attackhit.add(  o_ah.iscrit  ).readU8();
//        cha = args[2]; // collisionhitattribute
//        recount('ec::ondt',damage,iscrit,cha,0,tis);
//    },
//    onLeave: function(retval){
//    }
//});




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
            }
        }
    });
}

if(dummy){
    hook( offset.enemyctrl.setaiaction ,{
        onEnter: function(args){
            //console.log('onEnter:'+args[0]); //+args[0]);
            this.context.x1 = 0;
        },
        onLeave: function(ret){
        }
    });
}

if(attack){
    hook(offset.characterbase.get_attack, {  // CharacterBase$$get_attack
        onEnter: function(args){
        },
        onLeave: function(retval){
            retval.replace(attack);
        }
    });
}


