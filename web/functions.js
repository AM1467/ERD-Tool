

                        // Geting client height & width
                        
                        var divHeight = document.getElementById('drawing-box').clientHeight;
                           

                        var divWidth = document.getElementById('drawing-box').clientWidth;
                        
                        // SAVING & LOADING //
                        
                        $(function() 
                        {
                          console.log( "ready!" );
                          // Check for the various File API support.
                          if (window.File && window.FileReader && window.FileList && window.Blob) 
                          {
                            //alert("This browser supports file loading...");
                            $('#load-text-file').change(function(evt){ return openFile(evt, $('#textInput')); } );
                            $('#load-html-file').change(function(evt){ return openFile(evt, $('#htmlInput')); } );
                          } 
                          else 
                          {
                            alert('The File APIs are not fully supported in this browser.');
                          }
                        }
                       );

                      function saveFile (ref, fname, text, mime)
                      {
                        var blob = new Blob([text], {type: mime});
                        saveAs(blob, fname);

                        return false;
                      }


                      function openFile(evt, target) 
                      {
                        var files = evt.target.files;
                        if( files.length > 1 )
                        {
                          alert("Multiple files not supported...");
                        }

                        //alert(JSON.stringify(files,null,2));
                        file = files[0];
                        
                        $(evt.target).prev('.file-details').html(file.name);

                        var reader = new FileReader();
                        // Closure to capture the file information.
                        reader.onload = (
                          function(theFile) 
                          {
                            return function(e) 
                            {
                                
                                
                              if (window.DOMParser)
                        {
                        parser=new DOMParser();
                        xmlDoc=parser.parseFromString(e.target.result,"text/xml");
                        }
                      else // Internet Explorer
                        {
                        xmlDoc=new ActiveXObject("Microsoft.XMLDOM");
                        xmlDoc.async=false;
                        xmlDoc.loadXML(e.target.result);
                        }
                        
                       var client_height = xmlDoc.getElementsByTagName("client-height")[0].childNodes[0].nodeValue;
                       
                       client_height = Math.floor(Number(client_height)); 
                       
                       var client_width = xmlDoc.getElementsByTagName("client-width")[0].childNodes[0].nodeValue;
                                
                       client_width = Math.floor(Number(client_width));
                       
                       var height_ratio = (divHeight / client_height);
                       
                      
                       
                       var width_ratio = (divWidth / client_width);
                       
                      
                      var x = xmlDoc.getElementsByTagName("entity");
                         
                            for (i = 0; i <x.length; i++) {   // get data for each entity node
                                  
                                var ent_type = xmlDoc.getElementsByTagName("type")[i].childNodes[0].nodeValue;
                                
                                var ent_name = xmlDoc.getElementsByTagName("name")[i].childNodes[0].nodeValue;
                                
                                var ent_x = xmlDoc.getElementsByTagName("x")[i].childNodes[0].nodeValue;
                                
                                var ent_specializations = xmlDoc.getElementsByTagName("specsuper")[i].childNodes[0].nodeValue;
                                
                                var ent_defcrit = xmlDoc.getElementsByTagName("defcriteria")[i].childNodes[0].nodeValue;
                                
                                var ent_unions = xmlDoc.getElementsByTagName("unionsubs")[i].childNodes[0].nodeValue;
                                
                                ent_x = Math.floor(Number(ent_x)) * width_ratio;
                                
                                var ent_y = xmlDoc.getElementsByTagName("y")[i].childNodes[0].nodeValue;
                                
                                ent_y = Math.floor(Number(ent_y)) * height_ratio;
                                
                               
                                
                                var ent_super = xmlDoc.getElementsByTagName("entsuper")[i].childNodes[0].nodeValue;
                                
                                
                                createRect(ent_type, ent_name, ent_super, ent_specializations, ent_defcrit, ent_unions, ent_x, ent_y);  
                      
                              }          
                              
                      x = xmlDoc.getElementsByTagName("attribute");
                         
                            for (i = 0; i <x.length; i++) {   // get data for each entity node
                                  
                                var attr_type = xmlDoc.getElementsByTagName("a-type")[i].childNodes[0].nodeValue;
                                
                                var attr_name = xmlDoc.getElementsByTagName("a-name")[i].childNodes[0].nodeValue;
                                
                                var attr_x = xmlDoc.getElementsByTagName("a-x")[i].childNodes[0].nodeValue;
                                
                                attr_x = Math.floor(Number(attr_x)) * width_ratio;
                           
                                var attr_y = xmlDoc.getElementsByTagName("a-y")[i].childNodes[0].nodeValue;
                                
                                attr_y = Math.floor(Number(attr_y)) * height_ratio;
                                
                                var attr_data = xmlDoc.getElementsByTagName("a-data")[i].childNodes[0].nodeValue;
                                
                                var attr_n = xmlDoc.getElementsByTagName("a-n")[i].childNodes[0].nodeValue;
                                
                                attr_n = Math.floor(Number(attr_n));
                                
                                var attr_i = xmlDoc.getElementsByTagName("a-i")[i].childNodes[0].nodeValue;
                                
                                attr_i = Math.floor(Number(attr_i));
                                
                                var attr_j = xmlDoc.getElementsByTagName("a-j")[i].childNodes[0].nodeValue;
                                
                                attr_j = Math.floor(Number(attr_j));
                                
                                var attr_primary = xmlDoc.getElementsByTagName("a-primary")[i].childNodes[0].nodeValue;
                                
                                var attr_unique = xmlDoc.getElementsByTagName("a-unique")[i].childNodes[0].nodeValue;
                                
                                var attr_notnull = xmlDoc.getElementsByTagName("a-notnull")[i].childNodes[0].nodeValue;
                                
                                var attr_owner = xmlDoc.getElementsByTagName("a-owner")[i].childNodes[0].nodeValue;
                                

                                createEllipse(attr_type, attr_name, attr_data, attr_n, attr_i, attr_j, attr_primary, attr_unique, attr_notnull, attr_owner, attr_x, attr_y);  
                      
                              }   
                              
                            x = xmlDoc.getElementsByTagName("relationship");
                         
                            for (i = 0; i <x.length; i++) {   // get data for each entity node
                                  
                                var rel_type = xmlDoc.getElementsByTagName("r-type")[i].childNodes[0].nodeValue;

                                var rel_name = xmlDoc.getElementsByTagName("r-name")[i].childNodes[0].nodeValue;
                                
                                var rel_x = xmlDoc.getElementsByTagName("r-x")[i].childNodes[0].nodeValue;
                                
                                rel_x = Math.floor(Number(rel_x)) * width_ratio;
                           
                                var rel_y = xmlDoc.getElementsByTagName("r-y")[i].childNodes[0].nodeValue;
                                
                                rel_y = Math.floor(Number(rel_y)) * height_ratio;
                                
                                // IDs
                                
                                var rel_top = xmlDoc.getElementsByTagName("r-top")[i].childNodes[0].nodeValue;
                                
                                var rel_bot = xmlDoc.getElementsByTagName("r-bot")[i].childNodes[0].nodeValue;
                                
                                var rel_left = xmlDoc.getElementsByTagName("r-left")[i].childNodes[0].nodeValue;
                                
                                var rel_right = xmlDoc.getElementsByTagName("r-right")[i].childNodes[0].nodeValue;
                                
                                // partial-total
                                
                                var rel_top_double = xmlDoc.getElementsByTagName("r-topd")[i].childNodes[0].nodeValue;
                                
                                var rel_bot_double = xmlDoc.getElementsByTagName("r-botd")[i].childNodes[0].nodeValue;
                                
                                var rel_left_double = xmlDoc.getElementsByTagName("r-leftd")[i].childNodes[0].nodeValue;
                                
                                var rel_right_double = xmlDoc.getElementsByTagName("r-rightd")[i].childNodes[0].nodeValue;
                                
                                // ratio
                                
                                var rel_top_ratio = xmlDoc.getElementsByTagName("r-topr")[i].childNodes[0].nodeValue;
                                
                                var rel_bot_ratio = xmlDoc.getElementsByTagName("r-botr")[i].childNodes[0].nodeValue;
                                
                                var rel_left_ratio = xmlDoc.getElementsByTagName("r-leftr")[i].childNodes[0].nodeValue;
                                
                                var rel_right_ratio = xmlDoc.getElementsByTagName("r-rightr")[i].childNodes[0].nodeValue;

                                createRhombus(rel_type, rel_name, rel_top, rel_bot, rel_left, rel_right, rel_top_double, rel_bot_double, rel_left_double, rel_right_double, rel_top_ratio, rel_bot_ratio, rel_left_ratio, rel_right_ratio, rel_x, rel_y);  
                      
                              }       
                              
                               x = xmlDoc.getElementsByTagName("specialization-union");
                         
                            for (i = 0; i <x.length; i++) {   // get data for each entity node
                                  
                                var su_type = xmlDoc.getElementsByTagName("su-type")[i].childNodes[0].nodeValue;

                                var su_super = xmlDoc.getElementsByTagName("su-super")[i].childNodes[0].nodeValue;
                                
                                var su_defattr = xmlDoc.getElementsByTagName("su-defattr")[i].childNodes[0].nodeValue;
                              
                                var su_double = xmlDoc.getElementsByTagName("su-superd")[i].childNodes[0].nodeValue;
                                
                                var su_sub = xmlDoc.getElementsByTagName("su-sub")[i].childNodes[0].nodeValue;
                                
                                var su_sub_double = xmlDoc.getElementsByTagName("su-subd")[i].childNodes[0].nodeValue;
                                
                                var su_x = xmlDoc.getElementsByTagName("su-x")[i].childNodes[0].nodeValue;
                                
                                su_x = Math.floor(Number(su_x)) * width_ratio;
                           
                                var su_y = xmlDoc.getElementsByTagName("su-y")[i].childNodes[0].nodeValue;
                                
                                su_y = Math.floor(Number(su_y)) * height_ratio;

                                createCircle(su_type, su_super, su_defattr, su_double, su_sub, su_sub_double, su_x, su_y);  
                      
                              }    
                              
                              // Connect attributes to owners //
                              
                              for(i=0; i<globalAttributes.length; i++ ){
                                    
                                    var myOwner = globalAttributes[i].ownerPermanentID;
                                    
                                    if(myOwner !== "none"){
                                                                        
                                        for(j=0; j<globalEntities.length; j++){       // search entities first

                                            if (globalEntities[j].permanentID === myOwner){

                                                L.start = globalAttributes[i];
                                                L.end = globalEntities[j];
                                                connectAttrToOwner();

                                            }
                                        }
                                        
                                        for(j=0; j<globalRelationships.length; j++){       // search relationships second

                                            if (globalRelationships[j].permanentID === myOwner){

                                                L.start = globalAttributes[i];
                                                L.end = globalRelationships[j];
                                                connectAttrToOwner();

                                            }
                                        }
                                        
                                         for(j=0; j<globalAttributes.length; j++){       // search attributes last

                                            if (globalAttributes[j].permanentID === myOwner){

                                                L.start = globalAttributes[i];
                                                L.end = globalAttributes[j];
                                                connectAttrToOwner();

                                            }
                                        }
                                        
                                    }
                                    
                                    
                                        
                       
                                    }
                                    
                                    
                                    
                                    for(i=0; i<globalEntities.length; i++ ){
                                    
                                    var myEntitySuper = globalEntities[i].superPermanentID;
                                    
                                    var mySuperIDs = globalEntities[i].super_specializations_IDs;
                                    var mySuperSpecsList = mySuperIDs.split(",");
                                    
                                    var mydefCriteria = globalEntities[i].defCriteria;                                    
                                    var mydefCriteriaList = mydefCriteria.split(",");
                                                                        
                                    var myUnionsIDs = globalEntities[i].sub_unions_IDs;
                                    var myUnionsList = myUnionsIDs.split(",");
                                    
                                    
                                    if(myEntitySuper !== "none"){
                                                                        
                                        for(j=0; j<globalEntities.length; j++){       // search entities first

                                            if (globalEntities[j].permanentID === myEntitySuper){

                                                L.start = globalEntities[i];
                                                L.end = globalEntities[j];
                                                connectToSuper();

                                            }
                                        }
                                     
                                    }
                                    
                                        for(j=0; j<globalSpecs_Unions.length; j++){       
                                                
                                                
                                            
                                            for(k=0;k<mySuperSpecsList.length;k++){
                                                
                                                
                                                if(mySuperSpecsList[k] === globalSpecs_Unions[j].permanentID ){
                                                    
                                                    L.start = globalEntities[i];
                                                    L.end = globalSpecs_Unions[j];
                                                    
                                                    connectEntityToSpecialization(mydefCriteriaList[k]);
                                                    
                                                   
                                                }
                                                
                                            }
                                            
                                        }
                                      
                                        // unions
                                        
                                        for(j=0; j<globalSpecs_Unions.length; j++){      

                                            
                                            for(k=0;k<myUnionsList.length;k++){
                                                
                                                
                                                if(myUnionsList[k] === globalSpecs_Unions[j].permanentID ){
                                                    
                                                    L.end = globalEntities[i];
                                                    L.start = globalSpecs_Unions[j];
                                                    
                                                    connectUnionToSuper();
                                                    
                                                    
                                                }
                                                
                                            }
                                            
                                        }
                                  
                       
                                    }
                                    
                                    // end of entities
                                    
                                    for(i=0; i<globalSpecs_Unions.length; i++ ){
                                    
                                    var myEntitySuper = globalSpecs_Unions[i].superPermanentID;
                                    var myDefAttr = globalSpecs_Unions[i].defAttr;
                                    var mySuperDouble = globalSpecs_Unions[i].superDouble;
                                    var myEntitySub = globalSpecs_Unions[i].subID;
                                    var mySubDouble = globalSpecs_Unions[i].subDouble;
                                    
                                    
                                    if(myEntitySuper !== "none"){
                                                                        
                                        for(j=0; j<globalEntities.length; j++){       // search entities 

                                            if (globalEntities[j].permanentID === myEntitySuper){
                                                
                                                if(mySuperDouble === true){super_double = 1}
                                                else{super_double = 0}
                                                
                                                L.start = globalSpecs_Unions[i];
                                                L.end = globalEntities[j];
                                                connectToSuper();
                                                globalSpecs_Unions[i].superLine.attribute = myDefAttr;

                                            }
                                        }
                                        
                                    }
                                    
                                    if(myEntitySub !== "none"){
                                                                        
                                        for(j=0; j<globalEntities.length; j++){       // search entities 

                                            if (globalEntities[j].permanentID === myEntitySub){
                                                
                                                if(mySubDouble === true){union_double = 1}
                                                else{union_double = 0}
                                                
                                                L.end = globalSpecs_Unions[i];
                                                L.start = globalEntities[j];
                                                connectEntityToUnion();

                                            }
                                        }
                                        
                                    }
                                    
                       
                                    }
                                    
                                    for(i=0; i<globalRelationships.length; i++ ){
                                    
                                    var myTopID = globalRelationships[i].topID;
                                    var myTopDouble = globalRelationships[i].topDouble;
                                    var myTopRatio = globalRelationships[i].topRatio;
                                    
                                    if(myTopID !== "none"){
                                                                        
                                        for(j=0; j<globalEntities.length; j++){       // search entities first

                                            if (globalEntities[j].permanentID === myTopID){

                                                L.start = globalRelationships[i];
                                                L.end = globalEntities[j];
                                                edge = 1;
                                                
                                                if(myTopDouble === true){
                                                    
                                                    
                                                    connectRelToEntityTotal();
                                                    
                                                }
                                                
                                                else{
                                                    
                                                    connectRelToEntityPartial();
                                                    
                                                }
                                                
                                                globalRelationships[i].topLine.ratio = myTopRatio;

                                            }
                                        }
                                        
                                    }
                                    
                                    var myBotID = globalRelationships[i].botID;
                                    var myBotDouble = globalRelationships[i].botDouble;
                                    var myBotRatio = globalRelationships[i].botRatio;
                                    
                                    if(myBotID !== "none"){
                                                                        
                                        for(j=0; j<globalEntities.length; j++){       // search entities first

                                            if (globalEntities[j].permanentID === myBotID){

                                                L.start = globalRelationships[i];
                                                L.end = globalEntities[j];
                                                edge = 2;
                                                
                                                if(myBotDouble === true){
                                                    
                                                    
                                                    connectRelToEntityTotal();
                                                    
                                                }
                                                
                                                else{
                                                    
                                                    connectRelToEntityPartial();
                                                    
                                                }
                                                
                                                globalRelationships[i].botLine.ratio = myBotRatio;

                                            }
                                        }
                                        
                                    }
                                    
                                    var myLeftID = globalRelationships[i].leftID;
                                    var myLeftDouble = globalRelationships[i].leftDouble;
                                    var myLeftRatio = globalRelationships[i].leftRatio;
                                    
                                    if(myLeftID !== "none"){
                                                                        
                                        for(j=0; j<globalEntities.length; j++){       // search entities first

                                            if (globalEntities[j].permanentID === myLeftID){

                                                L.start = globalRelationships[i];
                                                L.end = globalEntities[j];
                                                edge = 3;
                                                
                                                if(myLeftDouble === true){
                                                    
                                                    
                                                    connectRelToEntityTotal();
                                                    
                                                }
                                                
                                                else{
                                                    
                                                    connectRelToEntityPartial();
                                                    
                                                }
                                                
                                                globalRelationships[i].leftLine.ratio = myLeftRatio;

                                            }
                                        }
                                        
                                    }
                                    
                                    var myRightID = globalRelationships[i].rightID;
                                    var myRightDouble = globalRelationships[i].rightDouble;
                                    var myRightRatio = globalRelationships[i].rightRatio;
                                    
                                    if(myRightID !== "none"){
                                                                        
                                        for(j=0; j<globalEntities.length; j++){       // search entities first

                                            if (globalEntities[j].permanentID === myRightID){

                                                L.start = globalRelationships[i];
                                                L.end = globalEntities[j];
                                                edge = 4;
                                                
                                                if(myRightDouble === true){
                                                    
                                                    
                                                    connectRelToEntityTotal();
                                                    
                                                }
                                                
                                                else{
                                                    
                                                    connectRelToEntityPartial();
                                                    
                                                }
                                                
                                                globalRelationships[i].rightLine.ratio = myRightRatio;

                                            }
                                        }
                                        
                                    }
                                    
                       
                                    }
                      
                              
                              target.html( e.target.result );
                            };
                          }
                        )(file);

                        // Read in the image file as a data URL.
                        reader.readAsText(file);
                      }
                      
                      
                        function generateFile(){
                
                   
                    var txt1 ='<?xml version="1.0" encoding="UTF-8"?>' + '<diagram>';
                    var txt2 = ""; 
                    var txt3 = "";
                    var txt4 = "";
                    var txt5 = "";
                    var text6 = "<client-height>" + divHeight + "</client-height>" + "<client-width>" + divWidth + "</client-width>";
                    
                    // attribute owner tag
                    var attrOwnerID = "";
                    // entity superclass tag
                    var entSuperID = "";
                    
                    // specialization superclass tag
                    var specSuperID = "";
                    var specSuperDouble = "";
                    var specDefAttr = "";
                    
                    // union subclass tag
                    var unionSubID = "";
                    var unionSubDouble = "";
                    
                    // relationship connections tags
                    var topID = "";
                    var botID = "";
                    var leftID = "";
                    var rightID = "";
                    
                    var topDouble = "";
                    var botDouble = "";
                    var leftDouble = "";
                    var rightDouble = "";
                    
                    var topRatio = "";
                    var botRatio = "";
                    var leftRatio = "";
                    var rightRatio = "";
                    
                    
                    for(i=0; i<globalEntities.length; i++ ){
                        
                        var entSuperSpecsIDs = "<specsuper>";    // to get specializations the entity belongs to
                        
                        var entDefCriteria = "<defcriteria>";    // to get defining criteria list
                        
                        var entUnionSubsIDs = "<unionsubs>";    // to get unions the entity belongs to
                        
                        var bbox = globalEntities[i].getBBox();
                        
                        txt2 = txt2 + "<entity>" + "<name>" + globalEntities[i].name + "</name>" + "<type>" + globalEntities[i].type + "</type>" + "<x>" + bbox.x + "</x>" + "<y>" + bbox.y + "</y>";
                        
                        
                        if (globalEntities[i].super !== 0){
                            
                            entSuperID = "<entsuper>" + globalEntities[i].super.permanentID  + "</entsuper>";
                           
                        }
                        
                        else { entSuperID = "<entsuper>" + "none" + "</entsuper>"; }
                        
                        if(globalEntities[i].super_specializations.length === 0){
                            
                            entSuperSpecsIDs = entSuperSpecsIDs + "none" + "</specsuper>";
                            entDefCriteria = entDefCriteria + "none" + "</defcriteria>";
                        }
                        
                        else{
                            
                           for(k=0; k<globalEntities[i].super_specializations.length; k++){
                            
                            
                            entSuperSpecsIDs = entSuperSpecsIDs  + "," + globalEntities[i].super_specializations[k].end.permanentID;
                            entDefCriteria = entDefCriteria  + "," + globalEntities[i].super_specializations[k].criteria;
                            
                        } 
                        
                        entSuperSpecsIDs = entSuperSpecsIDs + "</specsuper>";
                        entDefCriteria = entDefCriteria + "</defcriteria>";  
                        }
                        
                       
                        
                        // unions
                        
                        if(globalEntities[i].union_subs.length === 0){
                            
                            entUnionSubsIDs = entUnionSubsIDs + "none" + "</unionsubs>";
                        }
                        
                        else{
                            
                           for(k=0; k<globalEntities[i].union_subs.length; k++){
                            
                            
                            entUnionSubsIDs = entUnionSubsIDs  + "," + globalEntities[i].union_subs[k].start.permanentID;
                            
                        } 
                        
                        entUnionSubsIDs = entUnionSubsIDs + "</unionsubs>";
                            
                        }
                     
                        
                        txt2 = txt2 + entSuperID  + entSuperSpecsIDs + entDefCriteria + entUnionSubsIDs + "</entity>";
                    }
                    
                     for(i=0; i<globalAttributes.length; i++ ){
                        
                        var bbox = globalAttributes[i].getBBox();
                        
                        txt3 = txt3 + "<attribute>" + "<a-name>" + globalAttributes[i].name + "</a-name>" + "<a-type>" + globalAttributes[i].type + "</a-type>" + "<a-data>" + globalAttributes[i].dataT + "</a-data>" + "<a-n>" + 
                        globalAttributes[i].n + "</a-n>" + "<a-i>" + globalAttributes[i].i + "</a-i>" +  "<a-j>" + globalAttributes[i].j  + "</a-j>" +  "<a-primary>" + globalAttributes[i].primary + "</a-primary>" + "<a-unique>" + 
                        globalAttributes[i].unique + "</a-unique>" + "<a-notnull>" + globalAttributes[i].notNull + "</a-notnull>" + "<a-x>" + bbox.cx + "</a-x>" + "<a-y>" + bbox.cy + "</a-y>";
                        
                        if (globalAttributes[i].owner !== 0){
                            
                            attrOwnerID = "<a-owner>" + globalAttributes[i].owner.permanentID  + "</a-owner>";
                           
                        }
                        
                        else { attrOwnerID = "<a-owner>" + "none"  + "</a-owner>"; }
                        txt3 = txt3 + attrOwnerID  + "</attribute>";
                        
                       
                       
                    }
                    
                    for(i=0; i<globalRelationships.length; i++ ){
                        
                        var bbox = globalRelationships[i].getBBox();
                        
                        txt4 = txt4 + "<relationship>" + "<r-name>" + globalRelationships[i].name + "</r-name>" + "<r-type>" + globalRelationships[i].type + "</r-type>" + "<r-x>" + bbox.x + "</r-x>" + "<r-y>" + bbox.y + "</r-y>";
                        
                        
                        // get ID of connected entities
                        
                        if(globalRelationships[i].topEntity !== 0){
                            
                            topID = "<r-top>" + globalRelationships[i].topEntity.permanentID + "</r-top>";
                            
                            topRatio = "<r-topr>" + globalRelationships[i].topLine.ratio + "</r-topr>";
                            
                            if(globalRelationships[i].topLine.companion !== 0){    // get type of each connection (partial/total)
                            
                            topDouble = "<r-topd>" + "true" + "</r-topd>";
                            
                            
                            } else topDouble = "<r-topd>" + "false" + "</r-topd>";
                            
                            
                            
                        } else {
                            
                        
                        topID = "<r-top>" + "none" + "</r-top>";
                        topDouble = "<r-topd>" + "false" + "</r-topd>";
                        topRatio = "<r-topr>" + "none" + "</r-topr>";
                    
                    }
                        
                        
                        if(globalRelationships[i].botEntity !== 0){
                            
                            botID = "<r-bot>" + globalRelationships[i].botEntity.permanentID + "</r-bot>";
                            
                            botRatio = "<r-botr>" + globalRelationships[i].botLine.ratio + "</r-botr>";
                            
                            if(globalRelationships[i].botLine.companion !== 0){    // get type of each connection (partial/total)
                            
                            botDouble = "<r-botd>" + "true" + "</r-botd>";
                            
                            
                            } else botDouble = "<r-botd>" + "false" + "</r-botd>";
                            
                            
                        } else {
                            
                        botID = "<r-bot>" + "none" + "</r-bot>";
                        botDouble = "<r-botd>" + "false" + "</r-botd>";
                        botRatio = "<r-botr>" + "none" + "</r-botr>";
                        
                    }
                        
                        if(globalRelationships[i].leftEntity !== 0){
                            
                            leftID = "<r-left>" + globalRelationships[i].leftEntity.permanentID + "</r-left>";
                            
                            leftRatio = "<r-leftr>" + globalRelationships[i].leftLine.ratio + "</r-leftr>";
                            
                            if(globalRelationships[i].leftLine.companion !== 0){   // get type of each connection (partial/total)
                            
                            leftDouble = "<r-leftd>" + "true" + "</r-leftd>";
                            
                            
                             } else leftDouble = "<r-leftd>" + "false" + "</r-leftd>";
                            
                            
                        } else {
                            
                        leftID = "<r-left>" + "none" + "</r-left>";
                        leftDouble = "<r-leftd>" + "false" + "</r-leftd>";
                        leftRatio = "<r-leftr>" + "none" + "</r-leftr>";
                    
                    }
                        
                        if(globalRelationships[i].rightEntity !== 0){
                            
                            rightID = "<r-right>" + globalRelationships[i].rightEntity.permanentID + "</r-right>";
                            
                            rightRatio = "<r-rightr>" + globalRelationships[i].rightLine.ratio + "</r-rightr>";
                            
                            if(globalRelationships[i].rightLine.companion !== 0){  // get type of each connection (partial/total)
                            
                            rightDouble = "<r-rightd>" + "true" + "</r-rightd>";
                            
                            
                        } else rightDouble = "<r-rightd>" + "false" + "</r-rightd>";
                            
                            
                        } else {
                            
                        rightID = "<r-right>" + "none" + "</r-right>";
                        rightDouble = "<r-rightd>" + "false" + "</r-rightd>";
                        rightRatio = "<r-rightr>" + "none" + "</r-rightr>";
                    
                    
                    }
                        
                        
                        
                       
                        
                        txt4 = txt4 + topID + botID + leftID + rightID + topDouble + botDouble + leftDouble + rightDouble + topRatio + botRatio + leftRatio + rightRatio + "</relationship>";
                       
                    }
                    
                    for(i=0; i<globalSpecs_Unions.length; i++ ){
                        
                        var bbox = globalSpecs_Unions[i].getBBox();
                        
                        txt5 = txt5 + "<specialization-union>" + "<su-type>" + globalSpecs_Unions[i].type + "</su-type>" + "<su-x>" + bbox.cx + "</su-x>" + "<su-y>" + bbox.cy + "</su-y>";
                        
                        if (globalSpecs_Unions[i].super !== 0){
                            
                            specSuperID = "<su-super>" + globalSpecs_Unions[i].super.permanentID  + "</su-super>";
                            specDefAttr = "<su-defattr>" + globalSpecs_Unions[i].superLine.attribute  + "</su-defattr>";
                            
                        if(globalSpecs_Unions[i].superLine.companion !== 0) {
                            
                            specSuperDouble = "<su-superd>" + "true" + "</su-superd>";
                        
                        }   
                        
                        else{
                            
                            specSuperDouble = "<su-superd>" + "false" + "</su-superd>";
                        }
                        
                                                   
                        }
                        
                        else { 
                            
                        specSuperID = "<su-super>" + "none" + "</su-super>"; 
                        specSuperDouble = "<su-superd>" + "false" + "</su-superd>";
                        specDefAttr = "<su-defattr>" + "none"  + "</su-defattr>";
                        
                    }
                    
                    // unions 
                    
                    
                      if (globalSpecs_Unions[i].sub !== 0){
                            
                            unionSubID = "<su-sub>" + globalSpecs_Unions[i].sub.permanentID  + "</su-sub>";
                        if(globalSpecs_Unions[i].superLine.companion !== 0) {
                            
                            unionSubDouble = "<su-subd>" + "true" + "</su-subd>";
                        
                        }   
                        
                        else{
                            
                            unionSubDouble = "<su-subd>" + "false" + "</su-subd>";
                        }
                        
                                                   
                        }
                        
                        else { 
                            
                        unionSubID = "<su-sub>" + "none" + "</su-sub>"; 
                        unionSubDouble = "<su-subd>" + "false" + "</su-subd>";
                        
                    }
                    
                        txt5 = txt5 + specSuperID  + specDefAttr + specSuperDouble + unionSubID  + unionSubDouble + "</specialization-union>";
                       
                    }
                   
                    var txt = txt1 + txt2 + txt3 + txt4 + txt5 + text6 + "</diagram>";
                    
                    return saveFile(this, 'saved-diagram', txt , 'text/plain;charset=utf-8');
                    
                };


                            // IMAGE EXPORT //
                            
                                    
                   // Capturing a diagram to PNG //   

                        function screenshot()  {   
                           
                          var svg = document.getElementsByTagName('svg')[0];
                          var svg_xml = (new XMLSerializer()).serializeToString(svg);
                          var blob = new Blob([svg_xml], {type:'image/svg+xml;charset=utf-8'});
                          var url = window.URL.createObjectURL(blob);

                          canvg('canvas', svg_xml);

                          var img = canvas.toDataURL("image/png");
                          var w = window.open(img);


                      };  
                
                           // ERROR CHECK //
                        function nameCheck(array){                         // check for duplicate names in a list
                            
                            sorted_array = array.sort();
                            
                            for (var k = 0; k < array.length; k++) {
                                if (sorted_array[k + 1] === sorted_array[k]) {
                                    return 1;
                                }
                            }
                            
                            return 0;
                            
                            
                        }; 
                        
                        function uniqueCheck(array){             // check for existence of unique attributes
                            
                            var count = 0;
                            var composite_unique = false;
                            
                            for (var k = 0; k < array.length; k++) {
                                
                                if(array[k].start.attributes.length >0 && array[k].start.primary === true){
                                    
                                    return 2;
                                    
                                }
                                
                                if (array[k].start.unique === true) {
                                    count ++;
                                }
                                
                                for( var m = 0; m < array[k].start.attributes.length; m ++){
                                    
                                    if(array[k].start.attributes[m].start.owner.type === "attribute" && (array[k].start.attributes[m].start.unique === true)){
                                        
                                        count ++;                                        
                                        
                                    }
                                    
                                }
                                
                                if(array[k].start.attributes.length >0 && array[k].start.unique === true){
                                    
                                    composite_unique =  true;
                                    
                                }
                            }
                            
                            if(count === 1 && composite_unique === true){
                                
                                return 2;
                                
                            }
                            
                            else if(count !== 0){
                                
                                return 1;
                                
                            }
                            
                            else{
                                
                                return 0;
                                
                            }
                            
                            
                                                       
                        };
                        
                        function duplicateUniqueCheck(array){    // check for duplicate unique attributes
                            
                            var unique_count = 0;
                            var primary_count = 0;
                            
                            for (var k = 0; k < array.length; k++) {
                                
                                if (array[k].start.unique === true) {
                                    unique_count ++;
                                    
                                     for( var m = 0; m < array[k].start.attributes.length; m ++){
                                    
                                    if(array[k].start.attributes[m].start.owner.type === "attribute" && array[k].start.attributes[m].start.unique === true){
                                        
                                        unique_count ++;                                        
                                        
                                    }
                                    
                                }
                                    
                                    
                                }
                                
                                if (array[k].start.primary === true) {
                                    
                                    primary_count ++;
                                    
                                    for( var m = 0; m < array[k].start.attributes.length; m ++){
                                    
                                    if(array[k].start.attributes[m].start.owner.type === "attribute" && array[k].start.attributes[m].start.primary === true){
                                        
                                        primary_count ++;                                        
                                        
                                    }
                                    
                                }
                                    
                                }
                            }
                            
                            if(unique_count>1 && primary_count === 0){
                                
                            return 0;
                        
                            }
                            
                            if(primary_count > 1){
                                
                            return 2;
                        
                            }
                            
                            else return 1;
                                                       
                        };
                        
                         function attributeNameCheck(array){                         // check for duplicate names in a list
                            
                            var sorted_array = array.sort();
                            
                            for (var k = 0; k < array.length; k++) {
                            
                                if (sorted_array[k] === sorted_array[k + 1]) {
                                    return 1;
                                }
                            }
                            
                            return 0;
                            
                            
                        }; 
                        
                        
                           
                        function errorCheck() {
                            
                            var names_list = [];
                            
                            var attr_names_list = [];
                           
                            var error_text = "";
                            
                            if(globalEntities.length === 0 && globalAttributes.length === 0 && globalRelationships.length === 0 && globalSpecs_Unions.length === 0){
                                
                                swal("No objects found.");
                                return 0;
                                
                            }
                            
                            // entities
                           
                            for(i=0; i<globalEntities.length; i++ ){
                                
                                names_list.push(globalEntities[i].name);
                                
                                
                                for (var p = 0; p < globalEntities[i].attributes.length; p++){
                                    
                                    attr_names_list.push(globalEntities[i].attributes[p].start.name);
                                   
                                    for(var q = 0; q < globalEntities[i].attributes[p].start.attributes.length; q++){
                                       
                                         if(globalEntities[i].attributes[p].start.attributes[q].start.owner.type !== "multi_attribute"){
                                        
                                            attr_names_list.push(globalEntities[i].attributes[p].start.attributes[q].start.name);
                                        
                                        }
                                        
                                    }
                                    
                                    
                                }
                                
                                if(attributeNameCheck(attr_names_list) === 1){   // attribute name check
                                    
                                    error_text = error_text + '\n' + " • Multiple attributes belonging to the same element cannot have the same name."
                                    
                                }
                                
                                attr_names_list = [];
                                
                                
                                if(globalEntities[i].attributes.length === 0){
                                    
                                   error_text = error_text + '\n' + " • Entity named " + '"' + globalEntities[i].name + '"' + " has no attributes.";
                                    
                                }
                                
                                
                               else{
                                  
                                   if(uniqueCheck(globalEntities[i].attributes) === 0){
                                       
                                       error_text = error_text + '\n' + " • Entity named " + '"' + globalEntities[i].name + '"' + " has no unique attributes.";
                                       
                                   }
                                   
                                   else if(uniqueCheck(globalEntities[i].attributes) === 2){
                                       
                                       error_text = error_text + '\n' + " • Composite primary keys are not supported yet. ";
                                       
                                   }
                                   
                                   if(duplicateUniqueCheck(globalEntities[i].attributes) === 0){
                                       
                                       error_text = error_text + '\n' + " • Entity named " + '"' + globalEntities[i].name + '"' + " has multiple unique attributes, please specify the primary key.";
                                       
                                   }
                                   if(duplicateUniqueCheck(globalEntities[i].attributes) === 2){
                                       
                                       error_text = error_text + '\n' + " • Entity named " + '"' + globalEntities[i].name + '"' + " has multiple primary keys, please specify only one key.";
                                       
                                   }
                                   
                               }
                               
                               var identifying_count = 0;
                               
                               if(globalEntities[i].type === "weak_entity"){
                                   
                                   if (globalEntities[i].subs.length !== 0 || globalEntities[i].specializations.length !== 0){
                                           
                                          error_text = error_text + '\n' + " • Weak entities cannot be superclasses.";  
                                           
                                       }
                                       
                                        if (globalEntities[i].super !== 0 || globalEntities[i].super_specializations.length !== 0){
                                           
                                          error_text = error_text + '\n' + " • Weak entities cannot have superclasses.";  
                                           
                                       }
                                   
                                   for(var j=0; j<globalEntities[i].relationships.length; j++){
                                       
                                       if (globalEntities[i].relationships[j].start.type === "identifying_rel"){
                                           
                                           identifying_count ++;
                                           
                                       }
                                       
                                   }
                                   
                                   if(identifying_count === 0){
                                       
                                       error_text = error_text + '\n' + " • Weak entity named " + '"' + globalEntities[i].name + '"' + " must be part of an identifying relationship.";
                                       
                                   }
                                   
                                   identifying_count = 0;
                                   
                               }
                               
                            }
                            
                             if(nameCheck(names_list) === 1){   // entity name check
                                    
                                    error_text = error_text + '\n' + " • Multiple  entities cannot have the same name."
                                    
                                }
                                
                                names_list = []; // reset
                                
                                for(i=0; i<globalAttributes.length; i++ ){
                                    
                                   
                              
                                if(globalAttributes[i].owner === 0){
                                    
                                    error_text = error_text + '\n' + " • Attribute named " + '"' + globalAttributes[i].name + '"' + " does not belong to an element.";
                                    
                                }
                                
                                if((globalAttributes[i].owner.type === "attribute" || globalAttributes[i].owner.type === "multi_attribute") && (globalAttributes[i].owner.notNull === "true") && (globalAttributes[i].notNull === "false")){
                                    
                                    error_text = error_text + '\n' + " • Attribute named " + '"' + globalAttributes[i].name + '"' + " needs to be NOT NULL.";
                                    
                                }
                                
                                
                            }
                            
                           
                                    
                                
                            
                            for(i=0; i<globalRelationships.length; i++ ){
                                
                                var connection_count = 0;
                                
                                 names_list.push(globalRelationships[i].name);
                                
                                for (p = 0; p < globalRelationships[i].attributes.length; p++){
                                    
                                    attr_names_list.push(globalRelationships[i].attributes[p].start.name);
                                   
                                    for(q = 0; q < globalRelationships[i].attributes[p].start.attributes.length; q++){
                                       
                                         if(globalRelationships[i].attributes[p].start.attributes[q].start.owner.type !== "multi_attribute"){
                                        
                                            attr_names_list.push(globalRelationships[i].attributes[p].start.attributes[q].start.name);
                                        
                                        }
                                        
                                    }
                                    
                                    
                                }
                                
                               
                                
                                if(attributeNameCheck(attr_names_list) === 1){   // attribute name check
                                    
                                    error_text = error_text + '\n' + " • Multiple attributes belonging to the same element cannot have the same name."
                                    
                                }
                                
                                attr_names_list = [];
                             
                                
                                if(globalRelationships[i].attributes.length !== 0 && globalRelationships[i].type === "identifying_rel"){
                                    
                                    error_text = error_text + '\n' + " • Identifying relationships cannot have attributes.";
                                    
                                    
                                }
                                
                                
                                if(globalRelationships[i].topLine !== 0){
                                    
                                   connection_count ++;
                                    
                                }
                                
                                if(globalRelationships[i].botLine !== 0){
                                    
                                   connection_count ++;
                                    
                                }
                                
                                if(globalRelationships[i].leftLine !== 0){
                                    
                                   connection_count ++;
                                    
                                }
                                
                                if(globalRelationships[i].rightLine !== 0){
                                    
                                   connection_count ++;
                                    
                                }
                                
                                    
                                  if(connection_count < 2){   // entity name check
                                    
                                    error_text = error_text + '\n' + " • Relationship named " + '"' + globalRelationships[i].name + '"' + " must be connected to at least 2 entities.";
                                    
                                }
                                
                               
                                    
                                if(globalRelationships[i].type === "identifying_rel"){
                                    
                                    var weak_connections = 0;
                                    var normal_connections = 0;
                                    var total_connection = true;
                                    var normal_ratios = [];
                                
                                if(globalRelationships[i].topEntity !== 0){
                                    
                                  if(globalRelationships[i].topEntity.type === "entity"){
                                      
                                      normal_connections ++;
                                      normal_ratios.push(globalRelationships[i].topLine.ratio);
                                      
                                  }
                                  else if(globalRelationships[i].topEntity.type === "weak_entity"){
                                      
                                      weak_connections ++;
                                      
                                      
                                      if(globalRelationships[i].topLine.companion === 0){
                                          
                                          total_connection = false;
                                          
                                      }
                                      
                                      
                                  }  
                                }
                                
                                if(globalRelationships[i].botEntity !== 0){
                                    
                                  if(globalRelationships[i].botEntity.type === "entity"){
                                      
                                      normal_connections ++;
                                      normal_ratios.push(globalRelationships[i].botLine.ratio);
                                      
                                  }
                                  else if(globalRelationships[i].botEntity.type === "weak_entity"){
                                      
                                      weak_connections ++;
                                      
                                      
                                      if(globalRelationships[i].botLine.companion === 0){
                                          
                                          total_connection = false;
                                          
                                      }
                                      
                                      
                                  }  
                                }
                                
                                if(globalRelationships[i].leftEntity !== 0){
                                    
                                  if(globalRelationships[i].leftEntity.type === "entity"){
                                      
                                      normal_connections ++;
                                      normal_ratios.push(globalRelationships[i].leftLine.ratio);
                                      
                                  }
                                  else if(globalRelationships[i].leftEntity.type === "weak_entity"){
                                      
                                      weak_connections ++;
                                      
                                      
                                      if(globalRelationships[i].leftLine.companion === 0){
                                          
                                          total_connection = false;
                                          
                                      }
                                      
                                      
                                  }  
                                }
                                
                                if(globalRelationships[i].rightEntity !== 0){
                                    
                                  if(globalRelationships[i].rightEntity.type === "entity"){
                                      
                                      normal_connections ++;
                                      normal_ratios.push(globalRelationships[i].rightLine.ratio);
                                      
                                  }
                                  else if(globalRelationships[i].rightEntity.type === "weak_entity"){
                                      
                                      weak_connections ++;
                                      
                                      
                                      if(globalRelationships[i].rightLine.companion === 0){
                                          
                                          total_connection = false;
                                          
                                      }
                                      
                                      
                                  }  
                                }
                                
                                if(weak_connections < 1 || weak_connections > 1){
                                    
                                    
                                     error_text = error_text + '\n' + " • Identifying relationship named " + '"' + globalRelationships[i].name + '"' + " must be connected to exactly one weak entity.";
                                    
                                    
                                }
                                
                                if(normal_connections < 1){
                                    
                                    
                                     error_text = error_text + '\n' + " • Identifying relationship named " + '"' + globalRelationships[i].name + '"' + " must be connected to at least one strong entity.";
                                    
                                    
                                }
                                
                                if(total_connection === false){
                                    
                                    
                                     error_text = error_text + '\n' + " • Identifying relationship named " + '"' + globalRelationships[i].name + '"' + " must be connected to a weak entity through total participation.";
                                    
                                    
                                }
                                
                                for(var w = 0; w<normal_ratios.length; w++){
                                    
                                    if(normal_ratios[w] === "N" || normal_ratios[w] === "M" || normal_ratios[w] === "L" || normal_ratios[w] === "K"){
                                        
                                        error_text = error_text + '\n' + " • Identifying relationship named " + '"' + globalRelationships[i].name + '"' + " must be connected to all owner entities using '1' cardinality ratio.";
                                        
                                    }
                                    
                                    
                                }
                               
                                    
                                    
                                    
                                }
                                
                            
                            }
                            
                            if(nameCheck(names_list) === 1){   // relationship name check
                                    
                                    error_text = error_text + '\n' + " • Multiple  relationships cannot have the same name."
                                    
                                }
                                
                                names_list = []; // reset
                            
                            for(i=0; i<globalSpecs_Unions.length; i++ ){
                                
                               if (globalSpecs_Unions[i].type === "disjoint" || globalSpecs_Unions[i].type === "overlapping"){
                                   
                                   if(globalSpecs_Unions[i].super === 0){
                                       
                                        error_text = error_text + '\n' + " • Specializations must have a superclass.";
                                       
                                   }
                                   
                                   if(globalSpecs_Unions[i].subs.length < 2){
                                       
                                        error_text = error_text + '\n' + " • Specializations must have at least 2 subclasses.";
                                       
                                   }                          
                                   
                               }
                               
                               if (globalSpecs_Unions[i].type === "union"){
                                   
                                   if(globalSpecs_Unions[i].sub === 0){
                                       
                                        error_text = error_text + '\n' + " • Unions must have a subclass.";
                                       
                                   }
                                   
                                   if(globalSpecs_Unions[i].supers.length < 2){
                                       
                                        error_text = error_text + '\n' + " • Unions must have at least 2 superclasses.";
                                       
                                   }                          
                                   
                               }
                            
                            }
                                
                                // error display
                                
                                if(error_text === ""){
                                    
                                    return 1;
                                    
                                }
                                else{
                                    
                                   swal(error_text);
                                   return 0;
                                    
                                }
                                
                                


                        };
                        
                        function check (){
                            
                            if (errorCheck() === 1) {
                                
                                swal("", "No errors found.", "success");
                            }
                            
                        };
                        
                        // returns primary key of entity, data type of primary key, and unique attributes
                        // super_flag is used to take into account the existence of a superclass
                        function findPrimary(entity, super_flag){       // find primary key of an entity
                            
                           
                            var primary_count = 0;
                            
                            var primary_key_name ="";
                            
                            var unique_names = "";
                            
                            var dataT;
                            
                            var data_type;
                            
                            // for weak entities
                            
                            var weak_fkeys = [];
                                
                            var weak_fkeys_names = [];
                                
                            var owners = [];
                                
                            var primaries = [];
                                
                            var primary_datatypes = [];
                                
                            var primary_array;
                                
                            var temp_fkey = "";
                            
                            var recursion_array;
                            
                            
                            
                            
                            if(entity.super !== 0 && entity.super_specializations.length === 0 && super_flag === true){
                                
                                recursion_array = findPrimary(entity.super, true);
                                
                                primary_key_name = recursion_array[0];
                                unique_names = recursion_array[1];
                                dataT = recursion_array[2];
                                
                            }
                            
                            else if(entity.super === 0 && entity.super_specializations.length === 1 && super_flag === true){
                                
                                recursion_array = findPrimary(entity.super_specializations[0].end.super, true);
                                primary_key_name =  recursion_array[0];
                                unique_names = recursion_array[1];
                                dataT = recursion_array[2];
                                
                            }
                            
                            else {                            
                          
                            
                             for(var j=0; j<entity.attributes.length; j++){   // find primary first
                                        
                              
                                        if (entity.attributes[j].start.dataT === "DECIMAL"){
                                        
                                        data_type = entity.attributes[j].start.dataT + "(" + entity.attributes[j].start.i + ", " + entity.attributes[j].start.j + ")" ; 
                                        
                                        }

                                        else if (entity.attributes[j].start.dataT === "CHARACTER" || entity.attributes[j].start.dataT === "CHARACTER VARYING" || entity.attributes[j].start.dataT === "BIT" || entity.attributes[j].start.dataT === "BIT VARYING"){

                                               data_type = entity.attributes[j].start.dataT + "(" + entity.attributes[j].start.n + ")" ;                                     
                                        }

                                        else{

                                            data_type = entity.attributes[j].start.dataT;

                                        }
                                        
                                        
                                        
                                        
                                         if(entity.attributes[j].start.primary === true && entity.attributes[j].start.attributes.length === 0){

                                                primary_key_name = entity.attributes[j].start.name;
                                                dataT = data_type;
                                                primary_count ++;

                                            }
                                            
                                            if (entity.attributes[j].start.unique === true && entity.attributes[j].start.primary === false && entity.attributes[j].start.attributes.length === 0){
                                                
                                                if(primary_count === 0 ){              // in case there is no primary key 
                                                    
                                                    primary_key_name = entity.attributes[j].start.name;
                                                     dataT = data_type;
                                                    
                                                    
                                                }
                                                
                                                unique_names = unique_names + "," + ' ' + entity.attributes[j].start.name;
                                                
                                               
                                            }
                                            
                                            
                                            
                                            for (var s = 0; s < entity.attributes[j].start.attributes.length; s++){
                                                
                                                // COMPOSITE
                                                
                                                if (entity.attributes[j].start.attributes[s].start.dataT === "DECIMAL"){
                                        
                                                data_type = entity.attributes[j].start.attributes[s].start.dataT + "(" + entity.attributes[j].start.attributes[s].start.i + ", " + entity.attributes[j].start.attributes[s].start.j + ")" ; 

                                                }

                                                else if (entity.attributes[j].start.attributes[s].start.dataT === "CHARACTER" || entity.attributes[j].start.attributes[s].start.dataT === "CHARACTER VARYING" || entity.attributes[j].start.attributes[s].start.dataT === "BIT" || entity.attributes[j].start.attributes[s].start.dataT === "BIT VARYING"){

                                                       data_type = entity.attributes[j].start.attributes[s].start.dataT + "(" + entity.attributes[j].start.attributes[s].start.n + ")" ;                                     
                                                }

                                                else{

                                                    data_type = entity.attributes[j].start.attributes[s].start.dataT;

                                                }


                                                 if(entity.attributes[j].start.attributes[s].start.primary === true){

                                                        primary_key_name = entity.attributes[j].start.attributes[s].start.name;
                                                        dataT = data_type;
                                                        primary_count ++;

                                                    }

                                                    if (entity.attributes[j].start.attributes[s].start.unique === true && entity.attributes[j].start.attributes[s].start.primary === false){

                                                        if(primary_count === 0 ){              // in case there is no primary key 

                                                            primary_key_name = entity.attributes[j].start.attributes[s].start.name;
                                                             dataT = data_type;


                                                        }

                                                        unique_names = unique_names + "," + ' ' + entity.attributes[j].start.attributes[s].start.name;


                                                    }
                                                    
                                                    // END OF COMPOSITE


                                            }
                                     
                                        
                                    }
                                    
                                    if(entity.type === "weak_entity"){
                                        
                                        if(entity.weak_fkeys_names.length === 0){
                                       
                                        for(var j=0; j<entity.relationships.length; j++){  // cycle through relationships
                                            
                                            var temp_rel = entity.relationships[j].start;
                                             if(temp_rel.type === "identifying_rel"){
                                                
                                              
                                                if(temp_rel.topLine !== 0 && temp_rel.topEntity.type === "entity"){

                                                if (temp_rel.topEntity !== entity){
                                                    
                                                    primary_array = findPrimary(temp_rel.topEntity, true);
                                                    
                                                    owners.push(temp_rel.topEntity.name);
                                                    primaries.push(primary_array[0]);
                                                    primary_datatypes.push(primary_array[2]);
                                                    
                                                    temp_fkey = '\t' + "FK_" + foreign_keys_count + "_" + primary_array[0] + '\t' + primary_array[2] + " NOT NULL," + '\n';
                                                    weak_fkeys_names.push("FK_" + foreign_keys_count + "_" + primary_array[0]);
                                                    foreign_keys_count ++;
                                                    
                                                    weak_fkeys.push(temp_fkey);
                                                    
                                                  
                                                }
                                            
                                            }

                                            if(temp_rel.botLine !== 0 && temp_rel.botEntity.type === "entity"){

                                               
                                               if (temp_rel.botEntity !== entity){
                                                   
                                                    primary_array = findPrimary(temp_rel.botEntity, true);
                                                    
                                                    owners.push(temp_rel.botEntity.name);
                                                    primaries.push(primary_array[0]);
                                                    primary_datatypes.push(primary_array[2]);
                                                    
                                                    temp_fkey = '\t' + "FK_" + foreign_keys_count + "_" + primary_array[0] + '\t' + primary_array[2] + " NOT NULL," + '\n';
                                                    weak_fkeys_names.push("FK_" + foreign_keys_count + "_" + primary_array[0]);
                                                    foreign_keys_count ++;
                                                    
                                                    weak_fkeys.push(temp_fkey);
                                                   
                                                     
                                                }
                                                

                                            }

                                            if(temp_rel.leftLine !== 0 && temp_rel.leftEntity.type === "entity"){

                                               
                                                if (temp_rel.leftEntity !== entity){
                                                    
                                                    primary_array = findPrimary(temp_rel.leftEntity, true);
                                                    
                                                    owners.push(temp_rel.leftEntity.name);
                                                    primaries.push(primary_array[0]);
                                                    primary_datatypes.push(primary_array[2]);
                                                    
                                                    temp_fkey = '\t' + "FK_" + foreign_keys_count + "_" + primary_array[0] + '\t' + primary_array[2] + " NOT NULL," + '\n';
                                                    weak_fkeys_names.push("FK_" + foreign_keys_count + "_" + primary_array[0]);
                                                    foreign_keys_count ++;
                                                    
                                                    weak_fkeys.push(temp_fkey);
                                                   
                                                    
                                                    
                                                }
                                              

                                            }

                                            if(temp_rel.rightEntity !== 0 && temp_rel.rightEntity.type === "entity"){

                                                if (temp_rel.rightEntity !== entity){
                                                    
                                                    primary_array = findPrimary(temp_rel.rightEntity, true);
                                                    
                                                    owners.push(temp_rel.rightEntity.name);
                                                    primaries.push(primary_array[0]);
                                                    primary_datatypes.push(primary_array[2]);
                                                    
                                                    temp_fkey = '\t' + "FK_" + foreign_keys_count + "_" + primary_array[0] + '\t' + primary_array[2] + " NOT NULL," + '\n';
                                                    
                                                    weak_fkeys_names.push("FK_" + foreign_keys_count + "_" + primary_array[0]);
                                                    foreign_keys_count ++;
                                                    
                                                    weak_fkeys.push(temp_fkey);
                                                    
                                                    
                                                     
                                                }
                                         
                                            }
                                            
                                           
                                            }
                                            
                                        }
                                        
                                        entity.owners = owners;
                                        entity.primary_datatypes = primary_datatypes;
                                        entity.weak_fkeys_names = weak_fkeys_names;
                                        entity.weak_fkeys = weak_fkeys;
                                        entity.primaries = primaries;
                                    
                                     }
                                     
                                     else{
                                        
                                        primary_datatypes = entity.primary_datatypes;
                                        weak_fkeys_names = entity.weak_fkeys_names;
                                        weak_fkeys = entity.weak_fkeys;
                                        primaries = entity.primaries;
                                        owners = entity.owners;
                                         
                                         
                                     }
                                        
                                       
                                      
                                        
                                    }
                                    
                            }
                                   
                                    return [primary_key_name, unique_names, dataT];
                            
                            
                            
                            
                        };
                        
                        var foreign_keys_count = 1;
                        
                        function constructRelTable(rel){
                            
                            var array;
                            var f_keys_list = [];
                            var single_primary_key;
                            var unique_attributes;
                            var data_type;
                            var data_type2;
                            var n_table = "";
                            var alter_table = "";
                            var foreign_key_name;
                            var rel_keys = "";
                            var multi_primary_key_names = "";
                            var multi_fkeys =[];
                            var multi_fkeys_names = [];
                            var multi_primary_datatypes = [];
                            var all_data_types = [];
                            var multi_unique_names = "";
                            var foreign_key = "";
                            var reference_keys = [];
                            var all_reference_keys = [];
                            
                            // for weak entities
                            
                            var other_entity_type = "";   
                            var other_entity_fkeys = [];  
                            var other_entity_fkeys_datatypes = [];  
                            
                            // 
                           
                            var primary_key_name = "";
                            var txt4 = "";
                            
                             n_table = n_table + "CREATE TABLE" + " " + rel.name + " ( " + '\n';
                            
                            for(var j=0; j<rel.attributes.length; j++){ // outer attributes loop
                                
                                // find data type
                                        
                                        if (rel.attributes[j].start.dataT === "DECIMAL"){
                                        
                                        data_type2 = rel.attributes[j].start.dataT + "(" + rel.attributes[j].start.i + ", " + rel.attributes[j].start.j + ")" ; 
                                        
                                        }

                                        else if (rel.attributes[j].start.dataT === "CHARACTER" || rel.attributes[j].start.dataT === "CHARACTER VARYING" || rel.attributes[j].start.dataT === "BIT" || rel.attributes[j].start.dataT === "BIT VARYING"){

                                               data_type2 = rel.attributes[j].start.dataT + "(" + rel.attributes[j].start.n + ")" ;                                     
                                        }

                                        else{

                                            data_type2 = rel.attributes[j].start.dataT;

                                        }
                                        
                                        // end of data type
                                        
                                        if(rel.attributes[j].start.type === "attribute" || rel.attributes[j].start.type === "derived_attribute" && rel.attributes[j].start.attributes.length === 0){   // normal
                                            
                                            var n_table = n_table  + "\t" + rel.attributes[j].start.name + "\t" + data_type2;

                                            if(rel.attributes[j].start.notNull === true){


                                                n_table = n_table + " NOT NULL";

                                            }
                                            
                                            n_table = n_table +  "," + '\n';
                                            
                                           
                                        }
                                        
                                        else if(rel.attributes[j].start.type === "attribute" && rel.attributes[j].start.attributes.length !== 0){
                                            
                                            for (var s=0; s < rel.attributes[j].start.attributes.length; s++){
                                                
                                                // COMPOSITE
                                                
                                                 if (rel.attributes[j].start.attributes[s].start.dataT === "DECIMAL"){
                                        
                                                    data_type2 = rel.attributes[j].start.attributes[s].start.dataT + "(" + rel.attributes[j].start.attributes[s].start.i + ", " + rel.attributes[j].start.attributes[s].start.j + ")" ; 

                                                    }

                                                    else if (rel.attributes[j].start.attributes[s].start.dataT === "CHARACTER" || rel.attributes[j].start.attributes[s].start.dataT === "CHARACTER VARYING" || rel.attributes[j].start.attributes[s].start.dataT === "BIT" || rel.attributes[j].start.attributes[s].start.dataT === "BIT VARYING"){

                                                           data_type2 = rel.attributes[j].start.attributes[s].start.dataT + "(" + rel.attributes[j].start.attributes[s].start.n + ")" ;                                     
                                                    }

                                                    else{

                                                        data_type2 = rel.attributes[j].start.attributes[s].start.dataT;

                                                    }

                                                    // end of data type

                                                    if(rel.attributes[j].start.attributes[s].start.type === "attribute" || rel.attributes[j].start.attributes[s].start.type === "derived_attribute"){   // normal

                                                        var n_table = n_table  + "\t" + rel.attributes[j].start.attributes[s].start.name + "\t" + data_type2;

                                                        if(rel.attributes[j].start.attributes[s].start.notNull === true){

                                                            n_table = n_table + " NOT NULL";

                                                        }

                                                        n_table = n_table +  "," + '\n';


                                                    }
                                                
                                                
                                                // END OF COMPOSITE
                                             
                                                
                                            }
                                            
                                            
                                            
                                            
                                        }
                                        
                                        
                                        
                                        
                                
                            }   
                            
                          
                            
                            if(rel.topEntity !== 0){
                                
                               
                                
                                  array = findPrimary(rel.topEntity, true);
                                  other_entity_type = rel.topEntity.type;         // check if it is a weak entity 
                                  
                                  if(other_entity_type === "weak_entity") {         
                                                            
                                     other_entity_fkeys = rel.topEntity.weak_fkeys_names;
                                     other_entity_fkeys_datatypes = rel.topEntity.primary_datatypes;

                                 }
                                  
                                  
                                  single_primary_key = array[0];
                                  
                                  unique_attributes = array[1];
                                  data_type = array[2];
                                  all_reference_keys.push(single_primary_key);
                                  
                                  n_table = n_table + '\t' + "FK_" + foreign_keys_count + "_" + single_primary_key + '\t' + data_type + " NOT NULL," + '\n';
                                 
                                  foreign_key_name =  "FK_" + foreign_keys_count + "_" + single_primary_key;
                                  
                                  
                                  if(other_entity_type === "weak_entity"){        
                                              
                                        for(var v =0; v< other_entity_fkeys.length; v++){

                                         foreign_key_name = foreign_key_name + ", " +  "FK_" + foreign_keys_count + "_" + other_entity_fkeys[v];
                                         multi_primary_datatypes.push(other_entity_fkeys_datatypes[v]);
                                         single_primary_key = single_primary_key +  ", " + other_entity_fkeys[v];
                                        
                                         n_table = n_table + '\t' +  "FK_" + foreign_keys_count + "_" + other_entity_fkeys[v] + '\t' + other_entity_fkeys_datatypes[v] + ',' + '\n';
                                         
                                         // for multi
                                         
                                         if (rel.topLine.ratio === "N" || rel.topLine.ratio === "M" || rel.topLine.ratio === "K" || rel.topLine.ratio === "L"){
                                             
                                             multi_fkeys_names = multi_fkeys_names + '\t' + "FK_" + foreign_keys_count + "_" + other_entity_fkeys[v] +  '\t' + other_entity_fkeys_datatypes[v] + ' NOT NULL,' + '\n';
                                            
                                         }
                                         
                                        
                                        

                                         }
                                      
                                       }

                                 
                                  
                                   alter_table = alter_table + '\n' + "ALTER TABLE " + rel.name + " ADD FOREIGN KEY ("  + foreign_key_name + ") " +  "REFERENCES " + rel.topEntity.name + " (" + single_primary_key + ") ON DELETE CASCADE ON UPDATE CASCADE;" + '\n' + '\n';
                                    
                                   f_keys_list.push(foreign_key_name);
                                   
                                   all_data_types.push(data_type);
                                   
                                   
                                   if (rel.topLine.ratio === "N" || rel.topLine.ratio === "M" || rel.topLine.ratio === "K" || rel.topLine.ratio === "L"){
                                       
                                     
                                       
                                        if(reference_keys.indexOf(array[0]) < 0){
                                            
                                            multi_fkeys.push(foreign_key_name);
                                            multi_fkeys_names = multi_fkeys_names + '\t' + "FK_" + foreign_keys_count + "_" + array[0] + '\t' + data_type + " NOT NULL," + '\n';
                                            reference_keys.push(array[0]);
                                       
                                        }
                                        
                                        else if (rel.topEntity.super === 0){
                                            
                                            multi_fkeys.push(foreign_key_name);
                                            multi_fkeys_names = multi_fkeys_names + '\t' + "FK_" + foreign_keys_count + "_" + array[0] + '\t' + data_type + " NOT NULL," + '\n';
                                            reference_keys.push(array[0]);
                                            
                                        }
                                        
                                     
                                       
                                       rel_keys = rel_keys + "," + ' ' + foreign_key_name;
                                       
                                       multi_primary_datatypes.push(data_type);
                                       
                                       
                                   }
                                   
                                    foreign_keys_count ++;
                                   
                               
                                    
                                }
                                
                                if(rel.botEntity !== 0){
                                    
                                   array = findPrimary(rel.botEntity, true);
                                   
                                   other_entity_type = rel.botEntity.type;         // check if it is a weak entity 
                                  
                                  if(other_entity_type === "weak_entity") {          
                                                            
                                    var other_entity_fkeys = rel.botEntity.weak_fkeys_names;
                                    var other_entity_fkeys_datatypes = rel.botEntity.primary_datatypes;

                                 }
                                   
                                   
                                   single_primary_key = array[0];                                   
                                   unique_attributes = array[1];
                                   data_type = array[2];
                                   all_reference_keys.push(single_primary_key);
                                   
                                   n_table = n_table + '\t' + "FK_" + foreign_keys_count + "_" + single_primary_key + '\t' + data_type + " NOT NULL," + '\n';
                                   
                                   foreign_key_name =  "FK_" + foreign_keys_count + '_' + single_primary_key;
                                  
                                   if(other_entity_type === "weak_entity"){        
                                                    
                                        for(var v =0; v< other_entity_fkeys.length; v++){
                                            
                                         
                                         foreign_key_name = foreign_key_name + ", " +  "FK_" + foreign_keys_count + "_" + other_entity_fkeys[v];
                                         multi_primary_datatypes.push(other_entity_fkeys_datatypes[v]);
                                         single_primary_key = single_primary_key +  ", " + other_entity_fkeys[v];
                                         n_table = n_table + '\t' +  "FK_" + foreign_keys_count + "_" + other_entity_fkeys[v] + '\t' + other_entity_fkeys_datatypes[v] + ',' + '\n';

                                         if (rel.botLine.ratio === "N" || rel.botLine.ratio === "M" || rel.botLine.ratio === "K" || rel.botLine.ratio === "L"){
                                             
                                            multi_fkeys_names = multi_fkeys_names + '\t' + "FK_" + foreign_keys_count + "_" + other_entity_fkeys[v] +  '\t' + other_entity_fkeys_datatypes[v] + ' NOT NULL,' + '\n';
                                            reference_keys.push(single_primary_key);
                                           
                                         }

                                         }
                                      
                                       }
                                   
                                   
                                   
                                  
                                   alter_table = alter_table + '\n' + "ALTER TABLE " + rel.name + " ADD FOREIGN KEY ("  + foreign_key_name + ") " +  "REFERENCES " + rel.botEntity.name + " (" + single_primary_key + ") ON DELETE CASCADE ON UPDATE CASCADE;" + '\n' + '\n';
                                    
                                   
                                   f_keys_list.push(foreign_key_name);
                                   all_data_types.push(data_type);
                                  
                                   
                                   if (rel.botLine.ratio === "N" || rel.botLine.ratio === "M" || rel.botLine.ratio === "K" || rel.botLine.ratio === "L"){
                                       
                                      
                                        
                                        if(reference_keys.indexOf(array[0]) < 0){
                                            
                                            multi_fkeys.push(foreign_key_name);
                                            multi_fkeys_names = multi_fkeys_names + '\t' + "FK_" + foreign_keys_count + "_" + array[0] + '\t' + data_type + " NOT NULL," + '\n';
                                            reference_keys.push(array[0]);
                                       
                                        }
                                        
                                        else if (rel.botEntity.super === 0){
                                            
                                            multi_fkeys.push(foreign_key_name);
                                            multi_fkeys_names = multi_fkeys_names + '\t' + "FK_" + foreign_keys_count + "_" + array[0] + '\t' + data_type + " NOT NULL," + '\n';
                                            reference_keys.push(array[0]);
                                            
                                        }
                                     
                                       rel_keys = rel_keys + "," + ' ' + foreign_key_name;
                                       multi_primary_datatypes.push(data_type);
                                       
                                       
                                   }
                                   
                                   foreign_keys_count ++;
                                    
                                }
                                
                                if(rel.leftEntity !== 0){
                                    
                                    array = findPrimary(rel.leftEntity, true);
                                    
                                    other_entity_type = rel.leftEntity.type;         // check if it is a weak entity 
                                  
                                    if(other_entity_type === "weak_entity") {          

                                      var other_entity_fkeys = rel.leftEntity.weak_fkeys_names;
                                      var other_entity_fkeys_datatypes = rel.leftEntity.primary_datatypes;

                                   }
                                    
                                    single_primary_key = array[0];
                                    
                                    unique_attributes = array[1];
                                    data_type = array[2]; 
                                    all_reference_keys.push(single_primary_key);
                                    
                                   
                                    n_table = n_table + '\t' + "FK_" + foreign_keys_count + "_" + single_primary_key + '\t' + data_type + " NOT NULL," + '\n';
                                    foreign_key_name =  "FK_" + foreign_keys_count + "_" + single_primary_key;
                                    
                                    if(other_entity_type === "weak_entity"){        
                                                    
                                        for(var v =0; v< other_entity_fkeys.length; v++){
                                            
                                         
                                         multi_primary_datatypes.push(other_entity_fkeys_datatypes[v]);
                                         foreign_key_name = foreign_key_name + ", " +  "FK_" + foreign_keys_count + "_" + other_entity_fkeys[v];
                                         single_primary_key = single_primary_key +  ", " + other_entity_fkeys[v];
                                         n_table = n_table + '\t' +  "FK_" + foreign_keys_count + "_" + other_entity_fkeys[v] + '\t' + other_entity_fkeys_datatypes[v] + ',' + '\n';
                                         
                                         if (rel.leftLine.ratio === "N" || rel.leftLine.ratio === "M" || rel.leftLine.ratio === "K" || rel.leftLine.ratio === "L"){
                                             
                                            multi_fkeys_names = multi_fkeys_names + '\t' + "FK_" + foreign_keys_count + "_" + other_entity_fkeys[v] +  '\t' + other_entity_fkeys_datatypes[v] + ' NOT NULL,' + '\n';
                                            reference_keys.push(single_primary_key);
                                         }
                                         

                                         }
                                      
                                       }
                                    
                                   
                                  
                                    alter_table = alter_table + '\n' + "ALTER TABLE " + rel.name + " ADD FOREIGN KEY ("  + foreign_key_name + ") " +  "REFERENCES " + rel.leftEntity.name + " (" + single_primary_key + ") ON DELETE CASCADE ON UPDATE CASCADE;" + '\n' + '\n';
                                    
                                    all_data_types.push(data_type);
                                    f_keys_list.push(foreign_key_name);
                                    
                                    if (rel.leftLine.ratio === "N" || rel.leftLine.ratio === "M" || rel.leftLine.ratio === "K" || rel.leftLine.ratio === "L"){
                                        
                                        if(reference_keys.indexOf(array[0]) < 0){
                                            
                                            multi_fkeys.push(foreign_key_name);
                                            multi_fkeys_names = multi_fkeys_names + '\t' + "FK_" + foreign_keys_count + "_" + array[0] + '\t' + data_type + " NOT NULL," + '\n';
                                            reference_keys.push(array[0]);
                                       
                                        }
                                        
                                        else if (rel.leftEntity.super === 0){
                                            
                                            multi_fkeys.push(foreign_key_name);
                                            multi_fkeys_names = multi_fkeys_names + '\t' + "FK_" + foreign_keys_count + "_" + array[0] + '\t' + data_type + " NOT NULL," + '\n';
                                            reference_keys.push(array[0]);
                                            
                                        }
                                       
                                       
                                       rel_keys = rel_keys + "," + ' ' + foreign_key_name;
                                       multi_primary_datatypes.push(data_type);
                                       
                                       
                                   }
                                   
                                    foreign_keys_count ++;
                                    
                                }
                                
                                if(rel.rightEntity !== 0){
                                    
                                    array = findPrimary(rel.rightEntity, true);
                                    
                                    other_entity_type = rel.rightEntity.type;         // check if it is a weak entity 

                                      if(other_entity_type === "weak_entity") {         

                                        var other_entity_fkeys = rel.rightEntity.weak_fkeys_names;
                                        var other_entity_fkeys_datatypes = rel.rightEntity.primary_datatypes;

                                     }
                                    
                                    single_primary_key = array[0];
                                    
                                    unique_attributes = array[1];
                                    data_type = array[2];
                                    all_reference_keys.push(single_primary_key);
                                   
                                    n_table = n_table + '\t' + "FK_" + foreign_keys_count + "_" + single_primary_key + '\t' + data_type + " NOT NULL," + '\n';
                                    foreign_key_name =  "FK_" + foreign_keys_count + "_" + single_primary_key;
                                    
                                    if(other_entity_type === "weak_entity"){        
                                                    
                                        for(var v =0; v< other_entity_fkeys.length; v++){
                                            
                                        
                                         multi_primary_datatypes.push(other_entity_fkeys_datatypes[v]);
                                         foreign_key_name = foreign_key_name + ", " +  "FK_" + foreign_keys_count + "_" + other_entity_fkeys[v];
                                         single_primary_key = single_primary_key +  ", " + other_entity_fkeys[v];
                                         n_table = n_table + '\t' +  "FK_" + foreign_keys_count + "_" + other_entity_fkeys[v] + '\t' + other_entity_fkeys_datatypes[v] + ',' + '\n';

                                         if (rel.rightLine.ratio === "N" || rel.rightLine.ratio === "M" || rel.rightLine.ratio === "K" || rel.rightLine.ratio === "L"){
                                             
                                            multi_fkeys_names = multi_fkeys_names + '\t' + "FK_" + foreign_keys_count + "_" + other_entity_fkeys[v] +  '\t' + other_entity_fkeys_datatypes[v] + ' NOT NULL,' + '\n';
                                            reference_keys.push(single_primary_key);
                                         }

                                         }
                                      
                                       }
                                    
                                    
                                    
                                  
                                    alter_table = alter_table + '\n' + "ALTER TABLE " + rel.name + " ADD FOREIGN KEY ("  + foreign_key_name + ") " +  "REFERENCES " + rel.rightEntity.name + " (" + single_primary_key + ") ON DELETE CASCADE ON UPDATE CASCADE;" + '\n' + '\n';
                                    
                                    all_data_types.push(data_type);
                                    
                                    f_keys_list.push(foreign_key_name);
                                    
                                    if (rel.rightLine.ratio === "N" || rel.rightLine.ratio === "M" || rel.rightLine.ratio === "K" || rel.rightLine.ratio === "L"){
                                     
                                        if(reference_keys.indexOf(array[0]) < 0){
                                            
                                            multi_fkeys.push(foreign_key_name);
                                            multi_fkeys_names = multi_fkeys_names + '\t' + "FK_" + foreign_keys_count + "_" + array[0] + '\t' + data_type + " NOT NULL," + '\n';
                                            reference_keys.push(array[0]);
                                       
                                        }
                                        
                                        else if (rel.rightEntity.super === 0){
                                            
                                            multi_fkeys.push(foreign_key_name);
                                            multi_fkeys_names = multi_fkeys_names + '\t' + "FK_" + foreign_keys_count + "_" + array[0] + '\t' + data_type + " NOT NULL," + '\n';
                                            reference_keys.push(array[0]);
                                            
                                        }
                                      
                                       
                                       rel_keys = rel_keys + "," + ' ' + foreign_key_name;
                                       multi_primary_datatypes.push(data_type);
                                       
                                       
                                   }
                                   
                                  foreign_keys_count ++;
                                    
                                }
                                
                           if(rel_keys !== ""){
                               
                               n_table = n_table + "PRIMARY KEY ("  + rel_keys.substring(2) + ");" + '\n';
                               
                           } 
                           
                           else {
                               
                               
                               n_table = n_table + "PRIMARY KEY ("  + f_keys_list[0] + ")" ;
                               multi_fkeys.push(f_keys_list[0]);
                               reference_keys.push(all_reference_keys[0]);
                               multi_primary_datatypes.push(all_data_types[0]);
                               for (var k=1; k<f_keys_list.length; k++ ){
                                   
                                    n_table = n_table + "," + '\n' + "UNIQUE ("  + f_keys_list[k] + ")";
                                   
                                   
                               }
                               
                                                         
                           }
                           
                           if(multi_unique_names.substring(2) !== ""){     // need to make a unique specification
                                         
                                         n_table = n_table + ',' + '\n' + "UNIQUE (" + multi_unique_names.substring(2) + ")" + '\n';            
                                         
                                         
                            }
                            
                           n_table = n_table + " );" + '\n' ;
                            
                           
                           
                           
                           // relationship attributes //
                           
                             if(rel.attributes.length !== 0){
                                
                               for(j=0; j<rel.attributes.length; j++){   // outer attributes loop
                                        
                                        var txt2 = ''; // for multivalued attributes
                                        
                                        var txt3 = ''; // for multivalued attributes
                                        
                                        
                                                                              
                                        if(rel.attributes[j].start.type === "multi_attribute"){    // multi
                                            
                                            txt2 = txt2 +  '\n' + "CREATE TABLE" + " " + rel.attributes[j].start.name + " ( " + '\n';
                                            
                                           
                                            var multi_unique_names = "";
                                         
                                        for(var k=0; k<rel.attributes[j].start.attributes.length; k++){     // inner attributes loop
                                            
                                            var inner_data_type = '\t';
                                        
                                            if(rel.attributes[j].start.attributes[k].start.type === "attribute" || rel.attributes[j].start.attributes[k].start.type === "derived_attribute"){
                                                
                                                 if(rel.attributes[j].start.attributes[k].start.dataT === "DECIMAL"){
                                        
                                                    inner_data_type = rel.attributes[j].start.attributes[k].start.dataT + "(" + rel.attributes[j].start.attributes[k].start.i + ", " + rel.attributes[j].start.attributes[k].start.j + ")" ;                                       
                                                }

                                                else if (rel.attributes[j].start.attributes[k].start.dataT === "CHARACTER" || rel.attributes[j].start.attributes[k].start.dataT === "CHARACTER VARYING" || rel.attributes[j].start.attributes[k].start.dataT === "BIT" || rel.attributes[j].start.attributes[k].start.dataT === "BIT VARYING"){

                                                       inner_data_type = rel.attributes[j].start.attributes[k].start.dataT + "(" + rel.attributes[j].start.attributes[k].start.n + ")" ;                                     
                                                }

                                                else{

                                                    inner_data_type = rel.attributes[j].start.attributes[k].start.dataT;

                                                }
                                                
                                                

                                                txt2 = txt2 + "\t" + rel.attributes[j].start.attributes[k].start.name + '\t'  + inner_data_type;
                                               

                                                rel.attributes[j].start.attributes[k].start.notNull = true;


                                                    txt2 = txt2 + " NOT NULL";

                                                

                                                    txt2 = txt2 + "," + '\n' ;

                                                

                                                    multi_primary_key_names = multi_primary_key_names + "," + ' ' + rel.attributes[j].start.attributes[k].start.name;
                                                    
                                                    if (rel.attributes[j].start.attributes[k].start.unique === true){
                                                
                                                        multi_unique_names = multi_unique_names + "," + ' ' + rel.attributes[j].start.attributes[k].start.name;


                                                    }



                                            }
                                        
                                       
                                    }  // end of inner loop
                                    
                                    if(rel.attributes[j].start.attributes.length === 0){
                                       
                                                    multi_primary_key_names = multi_primary_key_names + ', ' + rel.attributes[j].start.name;
                                                    txt2 = txt2 + '\t' + rel.attributes[j].start.name + '\t' + data_type  + " NOT NULL," + '\n';
                                                    
                                                    if(rel.attributes[j].start.unique === true){

                                                        multi_unique_names = multi_unique_names + ', ' + rel.attributes[j].start.name;

                                                    }
                                                    

                                    }
                                    
                                    var reference_str = "";
                                    var fkeys_str = "";
                                     
                                     for (var h=0; h<multi_fkeys.length; h++){
                                         
                                         
                                         multi_primary_key_names = multi_primary_key_names + "," + ' ' + multi_fkeys[h]; 
                                         
                                         reference_str = reference_str + "," + ' ' + reference_keys[h];
                                         fkeys_str = fkeys_str + "," + ' ' + multi_fkeys[h];
                                         
                                         
                                     }
                                     
                                     txt2 = txt2 + multi_fkeys_names;
                                    
                                     txt2 = txt2 + "PRIMARY KEY ("  + (multi_primary_key_names).substring(2) + ")";
                                     
                                     
                                     if(multi_unique_names.substring(2) !== ""){     // need to make a unique specification
                                         
                                         txt2 = txt2 + ',' + '\n' + "UNIQUE (" + multi_unique_names.substring(2) + ")";            
                                         
                                         
                                     }
                                    
                                    
                                     txt2 = txt2 + " );" +  '\n' + '\n'  ;
                                     
                                     
                                     alter_table = alter_table + '\n' + "ALTER TABLE " + rel.attributes[j].start.name + " ADD FOREIGN KEY ("  + fkeys_str.substring(2) + ") " +  "REFERENCES " + rel.name + " (" + reference_str.substring(2) + ") ON DELETE CASCADE ON UPDATE CASCADE;" + '\n' + '\n';
                                            
                                      
                                            
                                     } // end of multi
                                     
                                     else  if(rel.attributes[j].start.type === "attribute"){
                                         
                                         for (var s=0; s < rel.attributes[j].start.attributes.length; s++){
                                             
                                             
                                             // COMPOSITE
                                             
                                             
                                                        if(rel.attributes[j].start.attributes[s].start.type === "multi_attribute"){    // multi

                                                       txt2 = txt2 +  '\n' + "CREATE TABLE" + " " + rel.attributes[j].start.attributes[s].start.name + " ( " + '\n';


                                                       var multi_unique_names = "";


                                               if(rel.attributes[j].start.attributes[s].start.attributes.length === 0){

                                                               multi_primary_key_names = multi_primary_key_names + ', ' + rel.attributes[j].start.attributes[s].start.name;
                                                               txt2 = txt2 + '\t' + rel.attributes[j].start.attributes[s].start.name + '\t' + data_type  + " NOT NULL," + '\n';

                                                               if(rel.attributes[j].start.attributes[s].start.unique === true){

                                                                   multi_unique_names = multi_unique_names + ', ' + rel.attributes[j].start.attributes[s].start.name;

                                                               }


                                               }

                                               var reference_str = "";
                                               var fkeys_str = "";

                                                for (var h=0; h<multi_fkeys.length; h++){


                                                    multi_primary_key_names = multi_primary_key_names + "," + ' ' + multi_fkeys[h]; 

                                                    reference_str = reference_str + "," + ' ' + reference_keys[h];
                                                    fkeys_str = fkeys_str + "," + ' ' + multi_fkeys[h];


                                                }

                                                txt2 = txt2 + multi_fkeys_names;

                                                txt2 = txt2 + "PRIMARY KEY ("  + (multi_primary_key_names).substring(2) + ")";


                                                if(multi_unique_names.substring(2) !== ""){     // need to make a unique specification

                                                    txt2 = txt2 + ',' + '\n' + "UNIQUE (" + multi_unique_names.substring(2) + ")";            


                                                }


                                                txt2 = txt2 + " );" +  '\n' + '\n'  ;


                                                alter_table = alter_table + '\n' + "ALTER TABLE " + rel.attributes[j].start.attributes[s].start.name + " ADD FOREIGN KEY ("  + fkeys_str.substring(2) + ") " +  "REFERENCES " + rel.name + " (" + reference_str.substring(2) + ") ON DELETE CASCADE ON UPDATE CASCADE;" + '\n' + '\n';



                                                }
                                             
                                             
                                             
                                             //END OF COMPOSITE                                    
                                       
                                         }
                                         
                                         
                                         
                                     }
                                     
                                                                     
                                      txt4 = txt4 + txt2;
                                      
                                    
                                        
                                    }
                               
                            }
                           
                           //end of attributes//
                           
                           n_table = n_table + txt4 + alter_table;
                           
                           return(n_table); 
                            
                        };
                        
                       // continue
                        
                        function convertToSQL(){
                            
                            if(errorCheck() === 1){   // check for errors first
                                
                                var txt1 ='';  // for basic entities
                                
                                var txt4 = "";
                                
                                var alter_table_case2 = "";
                                
                                var rel_txt2 = ""; // for multivalued attributes
                                
                                var rel_txt3 = ""; // for multivalued attributes
                                
                                // entities
                           
                            for(var i=0; i<globalEntities.length; i++ ){          // entities loop
                                
                                var foreign_key = "";
                                
                                var foreign_key_name = "";
                                
                                var primary_key_name = "";
                                
                                var unique_names = "";
                                
                                var primary_count = 0;
                                
                                var txt = "";
                                
                                var data_type = "";
                                
                                var additional_attr = "";
                                
                                // for weak entities:
                                
                                var weak_fkeys = [];
                                
                                var weak_fkeys_names = [];
                                
                                var owners = [];
                                
                                var primaries = [];
                                
                                var primary_datatypes = [];
                                
                                var primary_array;
                                
                                var temp_fkey = "";
                                
                                
                                
                                    for(var j=0; j<globalEntities[i].relationships.length; j++){  // cycle through relationships
                                            
                                            var temp_rel = globalEntities[i].relationships[j].start;
                                           
                                            var my_ratio = 0;
                                            var other_ratio = 0;
                                            var conn_count = 0; // connection count
                                            var my_primary = findPrimary(globalEntities[i], true);
                                            var other_primary = "";
                                            var other_entity_name = "";
                                            var other_entity_type = "";
                                            var other_entity_fkeys = [];
                                            var other_entity_fkeys_datatypes = [];
                                            var relationship_foreign_key = "";
                                            var my_companion;
                                            var other_companion;
                                            
                                            if(temp_rel.type === "relationship"){
                                           
                                            
                                            if(temp_rel.topLine !== 0){

                                                conn_count ++;
                                                
                                                if (temp_rel.topEntity === globalEntities[i]){
                                                    
                                                     my_ratio = temp_rel.topLine.ratio;
                                                     my_companion = (temp_rel.topLine.companion !== 0);
                                                    
                                                }
                                                
                                                else{ 
                                                    
                                                        other_ratio = temp_rel.topLine.ratio; 
                                                        other_primary = findPrimary(temp_rel.topEntity, true);
                                                        other_entity_name = temp_rel.topEntity.name;
                                                        other_entity_type = temp_rel.topEntity.type;
                                                        other_companion = (temp_rel.topLine.companion !== 0);
                                                        
                                                        if(other_entity_type === "weak_entity"){
                                                            
                                                            var other_entity_fkeys = temp_rel.topEntity.weak_fkeys_names;
                                                            var other_entity_fkeys_datatypes = temp_rel.topEntity.primary_datatypes;
                                                            
                                                        }
                                                
                                                    
                                                    }
                                               
                                            }

                                            if(temp_rel.botLine !== 0){

                                                conn_count ++;
                                               
                                               if (temp_rel.botEntity === globalEntities[i]){
                                                    
                                                     my_ratio = temp_rel.botLine.ratio;
                                                     my_companion = (temp_rel.botLine.companion !== 0);
                                                }
                                                
                                                else{ 
                                                    
                                                        other_ratio = temp_rel.botLine.ratio; 
                                                        other_primary = findPrimary(temp_rel.botEntity, true);
                                                        other_entity_name = temp_rel.botEntity.name;
                                                        other_entity_type = temp_rel.botEntity.type;
                                                        other_companion = (temp_rel.botLine.companion !== 0);
                                                        
                                                        if(other_entity_type === "weak_entity"){
                                                            
                                                            var other_entity_fkeys = temp_rel.botEntity.weak_fkeys_names;
                                                            var other_entity_fkeys_datatypes = temp_rel.botEntity.primary_datatypes;
                                                            
                                                        }
                                                
                                                    
                                                    }

                                            }

                                            if(temp_rel.leftLine !== 0){

                                                conn_count ++;
                                                
                                                if (temp_rel.leftEntity === globalEntities[i]){
                                                    
                                                     my_ratio = temp_rel.leftLine.ratio;
                                                     my_companion = (temp_rel.leftLine.companion !== 0);
                                                    
                                                }
                                                
                                                else{ 
                                                    
                                                        other_ratio = temp_rel.leftLine.ratio;
                                                        other_primary = findPrimary(temp_rel.leftEntity, true);
                                                        other_entity_name = temp_rel.leftEntity.name;
                                                        other_entity_type = temp_rel.leftEntity.type;
                                                        other_companion = (temp_rel.leftLine.companion !== 0);
                                                        
                                                        if(other_entity_type === "weak_entity"){
                                                            
                                                            var other_entity_fkeys = temp_rel.leftEntity.weak_fkeys_names;
                                                            var other_entity_fkeys_datatypes = temp_rel.leftEntity.primary_datatypes;
                                                            
                                                        }
                                                    
                                                    }

                                            }

                                            if(temp_rel.rightEntity !== 0){

                                                conn_count ++;
                                                
                                                if (temp_rel.rightEntity === globalEntities[i]){
                                                    
                                                     my_ratio = temp_rel.rightLine.ratio;
                                                     my_companion = (temp_rel.rightLine.companion !== 0);
                                                    
                                                }
                                                
                                                else{ 
                                                    
                                                        other_ratio = temp_rel.rightLine.ratio;
                                                        other_primary = findPrimary(temp_rel.rightEntity, true);
                                                        other_entity_name = temp_rel.rightEntity.name;
                                                        other_entity_type = temp_rel.rightEntity.type;
                                                        other_companion = (temp_rel.rightLine.companion !== 0);
                                                        
                                                        if(other_entity_type === "weak_entity"){
                                                            
                                                            var other_entity_fkeys = temp_rel.rightEntity.weak_fkeys_names;
                                                            var other_entity_fkeys_datatypes = temp_rel.rightEntity.primary_datatypes;
                                                            
                                                        }
                                                    
                                                    }

                                            }
                                            
                                           
                                           
                                            }   
                                            
                                            
                                          
                                            else if(temp_rel.type === "identifying_rel"  && globalEntities[i].type === "weak_entity"){
                                             
                                                
                                                if(globalEntities[i].weak_fkeys_names.length === 0){
                                              
                                                    if(temp_rel.topLine !== 0 && temp_rel.topEntity.type === "entity"){
                                                       
                                                    if (temp_rel.topEntity !== globalEntities[i]){
                                                        
                                                        if(temp_rel.topEntity.super !== 0){                 // check for entity superclass
                                                             
                                                             primary_array = findPrimary(temp_rel.topEntity, true );
                                                        
                                                        }
                                                        
                                                        else{
                                                            
                                                             primary_array = findPrimary(temp_rel.topEntity, false);
                                                        }

                                                       
                                                        
                                                        owners.push(temp_rel.topEntity.name);
                                                       
                                                        primaries.push(primary_array[0]);
                                                        primary_datatypes.push(primary_array[2]);

                                                        temp_fkey = '\t' + "FK_" + foreign_keys_count + "_" + primary_array[0] + '\t' + primary_array[2] + " NOT NULL," + '\n';
                                                        weak_fkeys_names.push("FK_" + foreign_keys_count + "_" + primary_array[0]);
                                                        foreign_keys_count ++;

                                                        weak_fkeys.push(temp_fkey);

                                                    }


                                                }

                                                if(temp_rel.botLine !== 0 && temp_rel.botEntity.type === "entity"){


                                                   if (temp_rel.botEntity !== globalEntities[i]){

                                                        if(temp_rel.botEntity.super !== 0){                 // check for entity superclass
                                                             
                                                             primary_array = findPrimary(temp_rel.botEntity, true );
                                                        
                                                        }
                                                        
                                                        else{
                                                            
                                                             primary_array = findPrimary(temp_rel.botEntity, false);
                                                        }
                                                      
                                                        owners.push(temp_rel.botEntity.name);
                                                        primaries.push(primary_array[0]);
                                                        primary_datatypes.push(primary_array[2]);

                                                        temp_fkey = '\t' + "FK_" + foreign_keys_count + "_" + primary_array[0] + '\t' + primary_array[2] + " NOT NULL," + '\n';
                                                        weak_fkeys_names.push("FK_" + foreign_keys_count + "_" + primary_array[0]);
                                                        foreign_keys_count ++;

                                                        weak_fkeys.push(temp_fkey);


                                                    }


                                                }

                                                if(temp_rel.leftLine !== 0 && temp_rel.leftEntity.type === "entity"){


                                                    if (temp_rel.leftEntity !== globalEntities[i]){

                                                        if(temp_rel.leftEntity.super !== 0){                 // check for entity superclass
                                                             
                                                             primary_array = findPrimary(temp_rel.leftEntity, true );
                                                        
                                                        }
                                                        
                                                        else{
                                                            
                                                             primary_array = findPrimary(temp_rel.leftEntity, false);
                                                        }
                                                     
                                                        owners.push(temp_rel.leftEntity.name);
                                                        primaries.push(primary_array[0]);
                                                        primary_datatypes.push(primary_array[2]);

                                                        temp_fkey = '\t' + "FK_" + foreign_keys_count + "_" + primary_array[0] + '\t' + primary_array[2] + " NOT NULL," + '\n';
                                                        weak_fkeys_names.push("FK_" + foreign_keys_count + "_" + primary_array[0]);
                                                        foreign_keys_count ++;

                                                        weak_fkeys.push(temp_fkey);



                                                    }


                                                }

                                                if(temp_rel.rightEntity !== 0 && temp_rel.rightEntity.type === "entity"){

                                                    if (temp_rel.rightEntity !== globalEntities[i]){

                                                        if(temp_rel.rightEntity.super !== 0){                 // check for entity superclass
                                                             
                                                             primary_array = findPrimary(temp_rel.rightEntity, true );
                                                        
                                                        }
                                                        
                                                        else{
                                                            
                                                             primary_array = findPrimary(temp_rel.rightEntity, false);
                                                        }
                                                       
                                                        owners.push(temp_rel.rightEntity.name);
                                                        primaries.push(primary_array[0]);
                                                        primary_datatypes.push(primary_array[2]);

                                                        temp_fkey = '\t' + "FK_" + foreign_keys_count + "_" + primary_array[0] + '\t' + primary_array[2] + " NOT NULL," + '\n';

                                                        weak_fkeys_names.push("FK_" + foreign_keys_count + "_" + primary_array[0]);
                                                        foreign_keys_count ++;

                                                        weak_fkeys.push(temp_fkey);



                                                    }



                                                }
                                                
                                                     globalEntities[i].weak_fkeys = weak_fkeys;
                                
                                                     globalEntities[i].weak_fkeys_names = weak_fkeys_names;
                                                     
                                                     globalEntities[i].owners = owners;
                                                     
                                                     globalEntities[i].primaries = primaries;

                                                     globalEntities[i].primary_datatypes = primary_datatypes;
                                                
                                            
                                            } // check if weak entity keys are already calculated
                                            
                                                else{
                                                    
                                                     weak_fkeys = globalEntities[i].weak_fkeys;
                                
                                                     weak_fkeys_names = globalEntities[i].weak_fkeys_names;
                                                     
                                                     owners = globalEntities[i].owners;
                                                     
                                                     primaries = globalEntities[i].primaries;

                                                     primary_datatypes = globalEntities[i].primary_datatypes;

                                                }
                                                
                                                
                                           
                                            }  // end of weak entity case
                                            
                                            
                                            var data_type2 = "";
                                            var rel_attributes = "";
                                            

                                        
                                        if(conn_count === 2){
                                          
                                            // check if relationship has attributes
                                            
                                            if(temp_rel.attributes.length !== 0){
                                               
                                                                          
                                                for(var j=0; j<temp_rel.attributes.length; j++){   // outer attributes loop

                                                         // find data type

                                                         if (temp_rel.attributes[j].start.dataT === "DECIMAL"){

                                                         data_type2 = temp_rel.attributes[j].start.dataT + "(" + temp_rel.attributes[j].start.i + ", " + temp_rel.attributes[j].start.j + ")" ; 

                                                         }

                                                         else if (temp_rel.attributes[j].start.dataT === "CHARACTER" || temp_rel.attributes[j].start.dataT === "CHARACTER VARYING" || temp_rel.attributes[j].start.dataT === "BIT" || temp_rel.attributes[j].start.dataT === "BIT VARYING"){

                                                                data_type2 = temp_rel.attributes[j].start.dataT + "(" + temp_rel.attributes[j].start.n + ")" ;                                     
                                                         }

                                                         else{

                                                             data_type2 = temp_rel.attributes[j].start.dataT;

                                                         }

                                                         // end of data type

                                                         if(temp_rel.attributes[j].start.type === "attribute" || temp_rel.attributes[j].start.type === "attribute" && temp_rel.attributes[j].start.attributes.length === 0){   // normal

                                                             rel_attributes = rel_attributes  + "\t" + temp_rel.attributes[j].start.name + "\t" + data_type2;

                                                             if(temp_rel.attributes[j].start.notNull === true){


                                                                 rel_attributes = rel_attributes + " NOT NULL";

                                                             }

                                                             rel_attributes = rel_attributes +  "," + '\n';

                                                             
                                                         }
                                                         
                                                         else if (temp_rel.attributes[j].start.type === "attribute" && temp_rel.attributes[j].start.attributes.length !== 0){  
                                                             
                                                             // COMPOSITE
                                                             
                                                             for (s = 0; s < temp_rel.attributes[j].start.attributes.length; s++){
                                                                 
                                                                 if (temp_rel.attributes[j].start.attributes[s].start.dataT === "DECIMAL"){

                                                                data_type2 = temp_rel.attributes[j].start.attributes[s].start.dataT + "(" + temp_rel.attributes[j].start.attributes[s].start.i + ", " + temp_rel.attributes[j].start.attributes[s].start.j + ")" ; 

                                                                }

                                                                else if (temp_rel.attributes[j].start.attributes[s].start.dataT === "CHARACTER" || temp_rel.attributes[j].start.attributes[s].start.dataT === "CHARACTER VARYING" || temp_rel.attributes[j].start.attributes[s].start.dataT === "BIT" || temp_rel.attributes[j].start.attributes[s].start.dataT === "BIT VARYING"){

                                                                       data_type2 = temp_rel.attributes[j].start.attributes[s].start.dataT + "(" + temp_rel.attributes[j].start.attributes[s].start.n + ")" ;                                     
                                                                }

                                                                else{

                                                                    data_type2 = temp_rel.attributes[j].start.attributes[s].start.dataT;

                                                                }

                                                                // end of data type

                                                                if(temp_rel.attributes[j].start.attributes[s].start.type === "attribute" || temp_rel.attributes[j].start.attributes[s].start.type === "derived_attribute"){   // normal

                                                                    rel_attributes = rel_attributes  + "\t" + temp_rel.attributes[j].start.attributes[s].start.name + "\t" + data_type2;

                                                                    if(temp_rel.attributes[j].start.attributes[s].start.notNull === true){


                                                                        rel_attributes = rel_attributes + " NOT NULL";

                                                                    }

                                                                    rel_attributes = rel_attributes +  "," + '\n';


                                                                }
   
                                                                 
                                                             }
                                                             
                                                             
                                                             
                                                             // END OF COMPOSITE
                                                             
                                                         }
                                                         
                                               

                                                     }
                                    
                            }
                                            
                                            
                                            // end of attributes
                                            
                                            var table_primary = "";
                                            var multi_rel_foreign_key = "";
                                            var multi_rel_foreign_key_name;
                                            var my_name;
                                            
                                            
                                            if((my_ratio === "N" || my_ratio === "M" || my_ratio === "L" || my_ratio === "K") && (other_ratio === "1")){
                                                
                                              
                                                my_name = globalEntities[i].name;
                                                additional_attr = additional_attr + '\t' + "FK_" + foreign_keys_count + "_" + other_primary[0] + '\t' + other_primary[2] + "," + '\n' + rel_attributes;
                                                relationship_foreign_key = "FK_" + foreign_keys_count + "_" + other_primary[0];
                                                foreign_keys_count ++;
                                                table_primary = my_primary[0]; // for multivalued attributes
                                                multi_rel_foreign_key = '\t' + "FK_" + foreign_keys_count + "_" + table_primary + '\t' + my_primary[2] + " NOT NULL," + '\n';  // for multivalued attributes
                                                multi_rel_foreign_key_name = "FK_" + foreign_keys_count + "_" + table_primary;
                                                foreign_keys_count ++;
                                                
                                                if(globalEntities[i].type === "weak_entity"){
                                                    
                                                    for(var v =0; v< globalEntities[i].weak_fkeys_names.length; v++){
                                                        
                                                         multi_rel_foreign_key = multi_rel_foreign_key+ '\t' + "FK_" + foreign_keys_count + "_" + globalEntities[i].weak_fkeys_names[v] + '\t' + globalEntities[i].primary_datatypes[v] + " NOT NULL," + '\n';  // for multivalued attributes
                                                         multi_rel_foreign_key_name = multi_rel_foreign_key_name + ', ' + "FK_" + foreign_keys_count + "_" + globalEntities[i].weak_fkeys_names[v];
                                                         table_primary = table_primary + ', ' + globalEntities[i].weak_fkeys_names[v];
                                                    }
                                                    
                                                }
                                                
                                                if(other_entity_type === "weak_entity"){
                                                    
                                                    for(var v =0; v< other_entity_fkeys.length; v++){
                                                        
                                                        relationship_foreign_key = relationship_foreign_key + ", " +  "FK_" + foreign_keys_count + "_" + other_entity_fkeys[v];
                                                        
                                                        other_primary[0] = other_primary[0] +  ", " + other_entity_fkeys[v];
                                                        additional_attr = additional_attr + '\t' +  "FK_" + foreign_keys_count + "_" + other_entity_fkeys[v] + '\t' + other_entity_fkeys_datatypes[v] + ',' + '\n';
                                                        
                                                    }
                                                    foreign_keys_count ++;
                                                    
                                                }
                                                
                                                alter_table_case2 = alter_table_case2 +  '\n' + "ALTER TABLE " + globalEntities[i].name + " ADD FOREIGN KEY ("  + relationship_foreign_key + ") " +  "REFERENCES " + other_entity_name + " (" + other_primary[0] + ") ON DELETE SET NULL ON UPDATE CASCADE;" + '\n' + '\n';
                                                
                                                
                                            }
                                            
                                            else  if((my_ratio === "1") && (other_ratio === "1") && (my_companion === true) && (other_companion === false)){
                                                
                                                my_name = globalEntities[i].name;
                                                additional_attr = additional_attr + '\t' + "FK_" + foreign_keys_count + "_" + other_primary[0] + '\t' + other_primary[2] + "," + '\n' + rel_attributes;
                                                relationship_foreign_key = "FK_" + foreign_keys_count + "_" + other_primary[0];
                                                foreign_keys_count ++;
                                                table_primary = my_primary[0];  // for multivalued attributes
                                                multi_rel_foreign_key = '\t' + "FK_" + foreign_keys_count + "_" + table_primary + '\t' + my_primary[2] + + " NOT NULL," + '\n';  // for multivalued attributes
                                                multi_rel_foreign_key_name = "FK_" + foreign_keys_count + "_" + table_primary;
                                                foreign_keys_count ++;
                                                
                                                if(other_entity_type === "weak_entity"){
                                                    
                                                    for(var v =0; v< other_entity_fkeys.length; v++){
                                                        
                                                        relationship_foreign_key = relationship_foreign_key + ", " +  "FK_" + foreign_keys_count + "_" + other_entity_fkeys[v];
                                                        other_primary[0] = other_primary[0] +  ", " + other_entity_fkeys[v];
                                                        additional_attr = additional_attr + '\t' +  "FK_" + foreign_keys_count + "_" + other_entity_fkeys[v] + '\t' + other_entity_fkeys_datatypes[v] + ',' + '\n';
                                                        
                                                    }
                                                    foreign_keys_count ++;
                                                    
                                                }
                                                
                                                
                                                alter_table_case2 = alter_table_case2 +  '\n' + "ALTER TABLE " + globalEntities[i].name + " ADD FOREIGN KEY ("  + relationship_foreign_key + ") " +  "REFERENCES " + other_entity_name + " (" + other_primary[0] + ") ON DELETE SET NULL ON UPDATE CASCADE;" + '\n' + '\n';
                                                
                                                
                                            }
                                            
                                            else  if((my_ratio === "1") && (other_ratio === "1") && (my_companion === false) && (other_companion === false) && temp_rel.visited === false){
                                                
                                                temp_rel.visited = true;                                               
                                                
                                                
                                            }
                                            
                                            else  if((my_ratio === "1") && (other_ratio === "1") && (my_companion === false) && (other_companion === false) && temp_rel.visited === true){
                                                
                                                my_name = globalEntities[i].name;
                                                additional_attr = additional_attr + '\t' + "FK_" + foreign_keys_count + "_" + other_primary[0] + '\t' + other_primary[2] + "," + '\n' + rel_attributes;
                                                relationship_foreign_key = "FK_" + foreign_keys_count + "_" + other_primary[0];
                                                foreign_keys_count ++;
                                                table_primary = my_primary[0];  // for multivalued attributes
                                                multi_rel_foreign_key = '\t' + "FK_" + foreign_keys_count + "_" + table_primary + '\t' + my_primary[2] + " NOT NULL," + '\n';  // for multivalued attributes
                                                multi_rel_foreign_key_name = "FK_" + foreign_keys_count + "_" + table_primary;
                                                foreign_keys_count ++;
                                                
                                                
                                                if(other_entity_type === "weak_entity"){
                                                    
                                                    for(var v =0; v< other_entity_fkeys.length; v++){
                                                        
                                                        relationship_foreign_key = relationship_foreign_key + ", " +  "FK_" + foreign_keys_count + "_" + other_entity_fkeys[v];
                                                        other_primary[0] = other_primary[0] +  ", " + other_entity_fkeys[v];
                                                        additional_attr = additional_attr + '\t' +  "FK_" + foreign_keys_count + "_" + other_entity_fkeys[v] + '\t' + other_entity_fkeys_datatypes[v] + ',' + '\n';
                                                     }   
                                                    
                                                    foreign_keys_count ++;
                                                    
                                                }
                                                
                                                
                                                
                                                alter_table_case2 = alter_table_case2 +  '\n' + "ALTER TABLE " + globalEntities[i].name + " ADD FOREIGN KEY ("  + relationship_foreign_key + ") " +  "REFERENCES " + other_entity_name + " (" + other_primary[0] + ") ON DELETE SET NULL ON UPDATE CASCADE;" + '\n' + '\n';
                                                                                            
                                                
                                                
                                            }
                                            
                                          
                                            
                                             // MULTI
                                             
                                             if(table_primary !== ""){
                                                  
                                                 for(j=0; j<temp_rel.attributes.length; j++){
                                                
                                                if(temp_rel.attributes[j].start.type === "multi_attribute"){   
                                            
                                                        rel_txt2 = rel_txt2 +  '\n' + "CREATE TABLE" + " " + temp_rel.attributes[j].start.name + " ( " + '\n';
                                                        
                                                        var rel_multi_primary_key_names = '';
                                                        var rel_multi_unique_names = "";
                                                       

                                                    for(k=0; k<temp_rel.attributes[j].start.attributes.length; k++){     // inner attributes loop

                                                        var rel_inner_data_type = '\t';

                                                        if(temp_rel.attributes[j].start.attributes[k].start.type === "attribute" || temp_rel.attributes[j].start.attributes[k].start.type === "derived_attribute"){

                                                             if(temp_rel.attributes[j].start.attributes[k].start.dataT === "DECIMAL"){

                                                                rel_inner_data_type = temp_rel.attributes[j].start.attributes[k].start.dataT + "(" + temp_rel.attributes[j].start.attributes[k].start.i + ", " + temp_rel.attributes[j].start.attributes[k].start.j + ")" ;                                       
                                                            }

                                                            else if (temp_rel.attributes[j].start.attributes[k].start.dataT === "CHARACTER" || temp_rel.attributes[j].start.attributes[k].start.dataT === "CHARACTER VARYING" || temp_rel.attributes[j].start.attributes[k].start.dataT === "BIT" || temp_rel.attributes[j].start.attributes[k].start.dataT === "BIT VARYING"){

                                                                   rel_inner_data_type = temp_rel.attributes[j].start.attributes[k].start.dataT + "(" + temp_rel.attributes[j].start.attributes[k].start.n + ")" ;                                     
                                                            }

                                                            else{

                                                                rel_inner_data_type = temp_rel.attributes[j].start.attributes[k].start.dataT;

                                                            }

                                                            rel_txt2 = rel_txt2 + "\t" + temp_rel.attributes[j].start.attributes[k].start.name + '\t'  + rel_inner_data_type;


                                                            temp_rel.attributes[j].start.attributes[k].start.notNull = true;


                                                                rel_txt2 = rel_txt2 + " NOT NULL";

                                                                rel_txt2 = rel_txt2 + "," + '\n' ;

                                                                rel_multi_primary_key_names = rel_multi_primary_key_names + "," + ' ' + temp_rel.attributes[j].start.attributes[k].start.name;

                                                                if (temp_rel.attributes[j].start.attributes[k].start.unique === true){

                                                                    rel_multi_unique_names = rel_multi_unique_names + "," + ' ' + temp_rel.attributes[j].start.attributes[k].start.name;


                                                                }



                                                        }


                                                }
                                                
                                                // if multi has no attributes
                                                
                                                if(temp_rel.attributes[j].start.attributes.length === 0){
                                       
                                                    rel_multi_primary_key_names = rel_multi_primary_key_names + ', ' + temp_rel.attributes[j].start.name;
                                                    rel_txt2 = rel_txt2 + '\t' + temp_rel.attributes[j].start.name + '\t' + data_type  + " NOT NULL," + '\n';
                                                    
                                                    if(temp_rel.attributes[j].start.unique === true){

                                                        rel_multi_unique_names = rel_multi_unique_names + ', ' + temp_rel.attributes[j].start.name;

                                                    }
                                                    

                                                }
                                                
                                                

                                                 rel_txt2 = rel_txt2 + multi_rel_foreign_key;

                                                 rel_txt2 = rel_txt2 + "PRIMARY KEY ("  + rel_multi_primary_key_names.substring(2) + "," + ' ' + multi_rel_foreign_key_name + ")";
                                                 
                                                 if(rel_multi_unique_names.substring(2) !== ""){     // need to make a unique specification

                                                     rel_txt2 = rel_txt2 + ',' + '\n' + "UNIQUE (" + rel_multi_unique_names.substring(2) + ")";            


                                                 }


                                                 rel_txt2 = rel_txt2 + " );" +  '\n' + '\n'  ;
                                                  
                                                 rel_txt3 = rel_txt3 + '\n' + "ALTER TABLE " + temp_rel.attributes[j].start.name + " ADD FOREIGN KEY ("  + multi_rel_foreign_key_name + ") " +  "REFERENCES " + my_name + " (" + table_primary + ") ON DELETE CASCADE ON UPDATE CASCADE;" + '\n' + '\n';
                                                 
                                                     

                                              }  // END of MULTI
                                              
                                              else  if(temp_rel.attributes[j].start.type === "attribute"){
                                              
                                            
                                              for (s = 0; s < temp_rel.attributes[j].start.attributes.length; s++){
                                                  
                                                  // COMPOSITE
                                                  
                                                  if(temp_rel.attributes[j].start.attributes[s].start.type === "multi_attribute"){   
                                            
                                                        rel_txt2 = rel_txt2 +  '\n' + "CREATE TABLE" + " " + temp_rel.attributes[j].start.attributes[s].start.name + " ( " + '\n';
                                                        
                                                        var rel_multi_primary_key_names = '';
                                                        var rel_multi_unique_names = "";
                                                       

                                                
                                                // if multi has no attributes
                                                
                                                if(temp_rel.attributes[j].start.attributes[s].start.attributes.length === 0){
                                       
                                                    rel_multi_primary_key_names = rel_multi_primary_key_names + ', ' + temp_rel.attributes[j].start.attributes[s].start.name;
                                                    rel_txt2 = rel_txt2 + '\t' + temp_rel.attributes[j].start.attributes[s].start.name + '\t' + data_type  + " NOT NULL," + '\n';
                                                    
                                                    if(temp_rel.attributes[j].start.attributes[s].start.unique === true){

                                                        rel_multi_unique_names = rel_multi_unique_names + ', ' + temp_rel.attributes[j].start.attributes[s].start.name;

                                                    }
                                                    

                                                }
                                                
                                                

                                                 rel_txt2 = rel_txt2 + multi_rel_foreign_key;

                                                 rel_txt2 = rel_txt2 + "PRIMARY KEY ("  + rel_multi_primary_key_names.substring(2) + "," + ' ' + multi_rel_foreign_key_name + ")";
                                                 
                                                 if(rel_multi_unique_names.substring(2) !== ""){     // need to make a unique specification

                                                     rel_txt2 = rel_txt2 + ',' + '\n' + "UNIQUE (" + rel_multi_unique_names.substring(2) + ")";            


                                                 }


                                                 rel_txt2 = rel_txt2 + " );" +  '\n' + '\n'  ;
                                                  
                                                 rel_txt3 = rel_txt3 + '\n' + "ALTER TABLE " + temp_rel.attributes[j].start.attributes[s].start.name + " ADD FOREIGN KEY ("  + multi_rel_foreign_key_name + ") " +  "REFERENCES " + my_name + " (" + table_primary + ") ON DELETE CASCADE ON UPDATE CASCADE;" + '\n' + '\n';
                                                 
                                                     

                                              }
                                                  
                                                  
                                                  
                                                  //END OF COMPOSITE
                                       
                                              }
                                          
                                                 }
                                     
                                                
                                             }   // outer attributes loop
                                                 
                                             }
                                            
                                           
                                            
                                        } // end of connection count IF condition
                                            
                                        }
                                        
                                       
                                    
                                    txt1 = txt1 + "CREATE TABLE" + " " + globalEntities[i].name + " ( " + '\n';
                                    
                                    if(globalEntities[i].type === "weak_entity"){
                                        
                                        for (var t =0; t<primaries.length; t++){
                                                
                                                txt1 = txt1 + weak_fkeys[t];
                                                
                                            }
                                        
                                    }
                                    
                                    
                                    
                                    txt1 = txt1 + additional_attr;
                                    
                                    
                                    for(j=0; j<globalEntities[i].attributes.length; j++){   // find primary first
                                        
                                        if (globalEntities[i].attributes[j].start.dataT === "DECIMAL"){
                                        
                                        data_type = globalEntities[i].attributes[j].start.dataT + "(" + globalEntities[i].attributes[j].start.i + ", " + globalEntities[i].attributes[j].start.j + ")" ; 
                                        
                                        }

                                        else if (globalEntities[i].attributes[j].start.dataT === "CHARACTER" || globalEntities[i].attributes[j].start.dataT === "CHARACTER VARYING" || globalEntities[i].attributes[j].start.dataT === "BIT" || globalEntities[i].attributes[j].start.dataT === "BIT VARYING"){

                                               data_type = globalEntities[i].attributes[j].start.dataT + "(" + globalEntities[i].attributes[j].start.n + ")" ;                                     
                                        }

                                        else{

                                            data_type = globalEntities[i].attributes[j].start.dataT;

                                        }
                                        
                                         if(globalEntities[i].attributes[j].start.primary === true){

                                                primary_key_name = globalEntities[i].attributes[j].start.name;
                                                var primary_key_dataT = data_type;
                                                primary_count ++;

                                            }
                                            
                                            if (globalEntities[i].attributes[j].start.unique === true && globalEntities[i].attributes[j].start.primary === false && globalEntities[i].attributes[j].start.attributes.length === 0 ){
                                                
                                                if(primary_count === 0){              // in case there is no primary key 
                                                    
                                                    primary_key_name = globalEntities[i].attributes[j].start.name;
                                                    var primary_key_dataT = data_type;
                                                    
                                                }
                                                
                                                unique_names = unique_names + "," + ' ' + globalEntities[i].attributes[j].start.name;
                                                
                                               
                                            }
                                            
                                            if(globalEntities[i].attributes[j].start.type === "attribute"){
                                                
                                                for (var s = 0; s < globalEntities[i].attributes[j].start.attributes.length; s++){   // do the same for composite attributes

                                                                if (globalEntities[i].attributes[j].start.attributes[s].start.dataT === "DECIMAL"){

                                                                    data_type = globalEntities[i].attributes[j].start.attributes[s].start.dataT + "(" + globalEntities[i].attributes[j].start.attributes[s].start.i + ", " + globalEntities[i].attributes[j].start.attributes[s].start.j + ")" ; 

                                                                    }

                                                                else if (globalEntities[i].attributes[j].start.attributes[s].start.dataT === "CHARACTER" || globalEntities[i].attributes[j].start.attributes[s].start.dataT === "CHARACTER VARYING" || globalEntities[i].attributes[j].start.attributes[s].start.dataT === "BIT" || globalEntities[i].attributes[j].start.attributes[s].start.dataT === "BIT VARYING"){

                                                                       data_type = globalEntities[i].attributes[j].start.attributes[s].start.dataT + "(" + globalEntities[i].attributes[j].start.attributes[s].start.n + ")" ;                                     
                                                                }

                                                                else{

                                                                    data_type = globalEntities[i].attributes[j].start.attributes[s].start.dataT;

                                                                }

                                                                if(globalEntities[i].attributes[j].start.attributes[s].start.primary === true){

                                                                       primary_key_name = globalEntities[i].attributes[j].start.attributes[s].start.name;
                                                                       var primary_key_dataT = data_type;
                                                                       primary_count ++;

                                                                   }

                                                                    if (globalEntities[i].attributes[j].start.attributes[s].start.unique === true && globalEntities[i].attributes[j].start.attributes[s].start.primary === false){

                                                                        if(primary_count === 0){              // in case there is no primary key 

                                                                            primary_key_name = globalEntities[i].attributes[j].start.attributes[s].start.name;
                                                                            var primary_key_dataT = data_type;

                                                                        }

                                                                        unique_names = unique_names + "," + ' ' + globalEntities[i].attributes[j].start.attributes[s].start.name;


                                                                    }

                                                }
                                           }
                                        
                                        
                                    }
                                    
                                    if((globalEntities[i].super !== 0 && globalEntities[i].super_specializations.length === 0) || (globalEntities[i].super === 0 && globalEntities[i].super_specializations.length === 1) ){
                                        
                                    foreign_key = '\t' + "FK_" + foreign_keys_count + "_" + findPrimary(globalEntities[i], true)[0] + '\t' + findPrimary(globalEntities[i], true)[2] + " NOT NULL," + '\n';
                                    foreign_key_name = "FK_" + foreign_keys_count + "_" + findPrimary(globalEntities[i], true)[0];
                                    
                                    
                                        
                                    }
                                    
                                    else{
                                        
                                    foreign_key = '\t' + "FK_" + foreign_keys_count + "_" + primary_key_name + '\t' + primary_key_dataT + " NOT NULL," + '\n';
                                    foreign_key_name = "FK_" + foreign_keys_count + "_" + primary_key_name;
                                    
                                    if(globalEntities[i].type === "weak_entity"){
                                        
                                        for (var t=0; t<primaries.length; t++){
                                                
                                                foreign_key = foreign_key + '\t' + "FK_" + foreign_keys_count + "_" + globalEntities[i].weak_fkeys_names[t] + '\t' + globalEntities[i].primary_datatypes[t] + " NOT NULL," + '\n';
                                                
                                                foreign_key_name = foreign_key_name + ', ' + "FK_" + foreign_keys_count + "_" + globalEntities[i].weak_fkeys_names[t];
                                                
                                            }
                                            
                                            
                                        
                                    }
                                        
                                        
                                    }
                                    
                                    
                                    
                                    
                                    foreign_keys_count ++;
                                   
                                    for(j=0; j<globalEntities[i].attributes.length; j++){   // outer attributes loop
                                        
                                        var txt2 = ''; // for multivalued attributes
                                        
                                        var txt3 = ''; // for multivalued attributes
                                      
                                        // find data type
                                        
                                        if (globalEntities[i].attributes[j].start.dataT === "DECIMAL"){
                                        
                                        data_type = globalEntities[i].attributes[j].start.dataT + "(" + globalEntities[i].attributes[j].start.i + ", " + globalEntities[i].attributes[j].start.j + ")" ; 
                                        
                                        }

                                        else if (globalEntities[i].attributes[j].start.dataT === "CHARACTER" || globalEntities[i].attributes[j].start.dataT === "CHARACTER VARYING" || globalEntities[i].attributes[j].start.dataT === "BIT" || globalEntities[i].attributes[j].start.dataT === "BIT VARYING"){

                                               data_type = globalEntities[i].attributes[j].start.dataT + "(" + globalEntities[i].attributes[j].start.n + ")" ;                                     
                                        }

                                        else{

                                            data_type = globalEntities[i].attributes[j].start.dataT;

                                        }
                                        
                                        // end of data type
                                        
                                        if(globalEntities[i].attributes[j].start.type === "attribute" || globalEntities[i].attributes[j].start.type === "derived_attribute" && globalEntities[i].attributes[j].start.attributes.length === 0){   // normal
                                            
                                            txt1 = txt1 + "\t" + globalEntities[i].attributes[j].start.name + "\t" + data_type;

                                            if(globalEntities[i].attributes[j].start.notNull === true  ){


                                                txt1 = txt1 + " NOT NULL";

                                            }

                                              txt1 = txt1 + "," + '\n' ;

                                           
                                            
                                        }
                                        
                                        else if (globalEntities[i].attributes[j].start.type === "attribute" && globalEntities[i].attributes[j].start.attributes.length !== 0){
                                            
                                            
                                            for (s = 0; s < globalEntities[i].attributes[j].start.attributes.length; s++){   // COMPOSITE
                                                
                                                // data type
                                                
                                                if (globalEntities[i].attributes[j].start.attributes[s].start.dataT === "DECIMAL"){
                                        
                                                    data_type = globalEntities[i].attributes[j].start.attributes[s].start.dataT + "(" + globalEntities[i].attributes[j].start.attributes[s].start.i + ", " + globalEntities[i].attributes[j].start.attributes[s].start.j + ")" ; 

                                                    }

                                                    else if (globalEntities[i].attributes[j].start.attributes[s].start.dataT === "CHARACTER" || globalEntities[i].attributes[j].start.attributes[s].start.dataT === "CHARACTER VARYING" || globalEntities[i].attributes[j].start.attributes[s].start.dataT === "BIT" || globalEntities[i].attributes[j].start.attributes[s].start.dataT === "BIT VARYING"){

                                                           data_type = globalEntities[i].attributes[j].start.attributes[s].start.dataT + "(" + globalEntities[i].attributes[j].start.attributes[s].start.n + ")" ;                                     
                                                    }

                                                    else{

                                                        data_type = globalEntities[i].attributes[j].start.attributes[s].start.dataT;

                                                    }
                                        
                                                   // end of data type
                                        
                                                    if(globalEntities[i].attributes[j].start.attributes[s].start.type === "attribute" || globalEntities[i].attributes[j].start.attributes[s].start.type === "derived_attribute"){   // normal

                                                        txt1 = txt1 + "\t" + globalEntities[i].attributes[j].start.attributes[s].start.name + "\t" + data_type;

                                                        if(globalEntities[i].attributes[j].start.attributes[s].start.notNull === true  ){


                                                            txt1 = txt1 + " NOT NULL";

                                                        }

                                                          txt1 = txt1 + "," + '\n' ;


                                                        }
                                                        
                                                        
                                                    else if(globalEntities[i].attributes[j].start.attributes[s].start.type === "multi_attribute"){    // multi

                                                            txt2 = txt2 +  '\n' + "CREATE TABLE" + " " + globalEntities[i].attributes[j].start.attributes[s].start.name + " ( " + '\n';
                                                            var multi_primary_key_names = "";
                                                            var multi_unique_names = "";


                                                    if(globalEntities[i].attributes[j].start.attributes[s].start.attributes.length === 0){

                                                        multi_primary_key_names = multi_primary_key_names + ', ' + globalEntities[i].attributes[j].start.attributes[s].start.name;
                                                        txt2 = txt2 + '\t' + globalEntities[i].attributes[j].start.attributes[s].start.name + '\t' + data_type  + " NOT NULL," + '\n';

                                                        if(globalEntities[i].attributes[j].start.attributes[s].start.unique === true){

                                                            multi_unique_names = multi_unique_names + ', ' + globalEntities[i].attributes[j].start.attributes[s].start.name;

                                                        }

                                                    }



                                                     txt2 = txt2 + foreign_key;

                                                     txt2 = txt2 + "PRIMARY KEY ("  + (multi_primary_key_names + ', ' + foreign_key_name).substring(2) + ")";

                                                     if(multi_unique_names.substring(2) !== ""){     // need to make a unique specification

                                                         txt2 = txt2 + ',' + '\n' + "UNIQUE (" + multi_unique_names.substring(2) + ")";            


                                                     }


                                                     txt2 = txt2 + " );" +  '\n' + '\n'  ;

                                                     if((globalEntities[i].super !== 0 && globalEntities[i].super_specializations.length === 0) || (globalEntities[i].super === 0 && globalEntities[i].super_specializations.length === 1)){               // check if entity has a super

                                                         var original_primaries = findPrimary(globalEntities[i], true)[0];


                                                         txt3 = txt3 + '\n' + "ALTER TABLE " + globalEntities[i].attributes[j].start.attributes[s].start.name + " ADD FOREIGN KEY ("  + foreign_key_name + ") " +  "REFERENCES " + globalEntities[i].name + " (" + original_primaries + ") ON DELETE CASCADE ON UPDATE CASCADE;" + '\n' + '\n';
                                                     }


                                                     else{

                                                                 var original_primaries = primary_key_name;

                                                                    if(globalEntities[i].type === "weak_entity"){

                                                                       for (var t=0; t<primaries.length; t++){

                                                                              original_primaries = original_primaries + ', ' +  globalEntities[i].weak_fkeys_names[t];

                                                                           }

                                                                   }
                                                         txt3 = txt3 + '\n' + "ALTER TABLE " + globalEntities[i].attributes[j].start.attributes[s].start.name + " ADD FOREIGN KEY ("  + foreign_key_name + ") " +  "REFERENCES " + globalEntities[i].name + " (" + original_primaries + ") ON DELETE CASCADE ON UPDATE CASCADE;" + '\n' + '\n';
                                                     }


                                                     foreign_keys_count ++;      

                                                     }  // end of multi
                                                        
      
                                            }
                                        
                                            
                                        }   // END OF COMPOSITE
                                        
                                        else if(globalEntities[i].attributes[j].start.type === "multi_attribute"){    // multi
                                            
                                            txt2 = txt2 +  '\n' + "CREATE TABLE" + " " + globalEntities[i].attributes[j].start.name + " ( " + '\n';
                                            var multi_primary_key_names = "";
                                            var multi_unique_names = "";
                                            
                                        
                                    
                                        for(k=0; k<globalEntities[i].attributes[j].start.attributes.length; k++){     // inner attributes loop
                                            
                                            var inner_data_type = '\t';
                                        
                                            if(globalEntities[i].attributes[j].start.attributes[k].start.type === "attribute" || globalEntities[i].attributes[j].start.attributes[k].start.type === "derived_attribute"){
                                                
                                                 if(globalEntities[i].attributes[j].start.attributes[k].start.dataT === "DECIMAL"){
                                        
                                                    inner_data_type = globalEntities[i].attributes[j].start.attributes[k].start.dataT + "(" + globalEntities[i].attributes[j].start.attributes[k].start.i + ", " + globalEntities[i].attributes[j].start.attributes[k].start.j + ")" ;                                       
                                                }

                                                else if (globalEntities[i].attributes[j].start.attributes[k].start.dataT === "CHARACTER" || globalEntities[i].attributes[j].start.attributes[k].start.dataT === "CHARACTER VARYING" || globalEntities[i].attributes[j].start.attributes[k].start.dataT === "BIT" || globalEntities[i].attributes[j].start.attributes[k].start.dataT === "BIT VARYING"){

                                                       inner_data_type = globalEntities[i].attributes[j].start.attributes[k].start.dataT + "(" + globalEntities[i].attributes[j].start.attributes[k].start.n + ")" ;                                     
                                                }

                                                else{

                                                    inner_data_type = globalEntities[i].attributes[j].start.attributes[k].start.dataT;

                                                }
                                                
                                                

                                                txt2 = txt2 + "\t" + globalEntities[i].attributes[j].start.attributes[k].start.name + "\t"  + inner_data_type;
                                               

                                                globalEntities[i].attributes[j].start.attributes[k].start.notNull = true;


                                                    txt2 = txt2 + " NOT NULL";

                                                

                                                    txt2 = txt2 + "," + '\n' ;

                                                

                                                    multi_primary_key_names = multi_primary_key_names + "," + ' ' + globalEntities[i].attributes[j].start.attributes[k].start.name;
                                                    
                                                    if (globalEntities[i].attributes[j].start.attributes[k].start.unique === true || globalEntities[i].attributes[j].start.unique === true){
                                                
                                                        multi_unique_names = multi_unique_names + "," + ' ' + globalEntities[i].attributes[j].start.attributes[k].start.name;


                                                    }


                                            }
                                        
                                       
                                    }   // end of inner attributes
                                   
                                   
                                    if(globalEntities[i].attributes[j].start.attributes.length === 0){
                                       
                                        multi_primary_key_names = multi_primary_key_names + ', ' + globalEntities[i].attributes[j].start.name;
                                        txt2 = txt2 + '\t' + globalEntities[i].attributes[j].start.name + '\t' + data_type  + " NOT NULL," + '\n';
                                        
                                        if(globalEntities[i].attributes[j].start.unique === true){
                                            
                                            multi_unique_names = multi_unique_names + ', ' + globalEntities[i].attributes[j].start.name;
                                            
                                        }
                                        
                                    }
                                   
                                    
                                    
                                     txt2 = txt2 + foreign_key;
                                    
                                     txt2 = txt2 + "PRIMARY KEY ("  + (multi_primary_key_names + ', ' + foreign_key_name).substring(2) + ")";
                                     
                                     if(multi_unique_names.substring(2) !== ""){     // need to make a unique specification
                                         
                                         txt2 = txt2 + ',' + '\n' + "UNIQUE (" + multi_unique_names.substring(2) + ")";            
                                         
                                         
                                     }
                                    
                                    
                                     txt2 = txt2 + " );" +  '\n' + '\n'  ;
                                     
                                     if((globalEntities[i].super !== 0 && globalEntities[i].super_specializations.length === 0) || (globalEntities[i].super === 0 && globalEntities[i].super_specializations.length === 1)){               // check if entity has a super
                                         
                                         var original_primaries = findPrimary(globalEntities[i], true)[0];
                                     
                                           
                                         txt3 = txt3 + '\n' + "ALTER TABLE " + globalEntities[i].attributes[j].start.name + " ADD FOREIGN KEY ("  + foreign_key_name + ") " +  "REFERENCES " + globalEntities[i].name + " (" + original_primaries + ") ON DELETE CASCADE ON UPDATE CASCADE;" + '\n' + '\n';
                                     }
                                     
                                    
                                     else{
                                      
                                                 var original_primaries = primary_key_name;
                                     
                                                    if(globalEntities[i].type === "weak_entity"){

                                                       for (var t=0; t<primaries.length; t++){

                                                              original_primaries = original_primaries + ', ' +  globalEntities[i].weak_fkeys_names[t];

                                                           }

                                                   }
                                         txt3 = txt3 + '\n' + "ALTER TABLE " + globalEntities[i].attributes[j].start.name + " ADD FOREIGN KEY ("  + foreign_key_name + ") " +  "REFERENCES " + globalEntities[i].name + " (" + original_primaries + ") ON DELETE CASCADE ON UPDATE CASCADE;" + '\n' + '\n';
                                     }
                                     
                                        
                                            
                                     foreign_keys_count ++;      
                                            
                                     }  // end of multi
                                     
                                    
                                                                        
                                      txt4 = txt4 + txt2 + txt3;
                                     
                                    }   // end of outer attributes loop
                                    
                                    if((unique_names.substring(2) !== primary_key_name) && unique_names.substring(2) !== ""){     // need to make a unique specification
                                         
                                         txt1 = txt1  + "UNIQUE (" + unique_names.substring(2) + ")" + ',' + '\n';            
                                         
                                         
                                     }
                                    
                                    if(globalEntities[i].type === "weak_entity"){
                                        
                                        for (var t =0; t<primaries.length; t++){
                                                
                                                primary_key_name = primary_key_name + ', ' + weak_fkeys_names[t];
                                                
                                                alter_table_case2 = alter_table_case2 + '\n' + "ALTER TABLE " + globalEntities[i].name + " ADD FOREIGN KEY ("  + weak_fkeys_names[t] + ") " +  "REFERENCES " + owners[t] + " (" + primaries[t] + ") ON DELETE CASCADE ON UPDATE CASCADE;" + '\n' + '\n';
                                                
                                                
                                            }
                                            
                                            
                                        
                                    }
                                    
                                    // UNIONS
                                    
                                    for (var u = 0; u < globalEntities[i].union_subs.length; u++){
                                        
                                        
                                        txt1 = txt1 + '\t' + "FK_" + foreign_keys_count + "_" + findPrimary(globalEntities[i].union_subs[u].start.sub, false)[0] + '\t' + findPrimary(globalEntities[i].union_subs[u].start.sub, false)[2] + ',' + '\n';
                                        alter_table_case2 = alter_table_case2 + '\n' + "ALTER TABLE " + globalEntities[i].name + " ADD FOREIGN KEY ("  + "FK_" + foreign_keys_count + "_" + findPrimary(globalEntities[i].union_subs[u].start.sub, false)[0] + ") " +  "REFERENCES " + globalEntities[i].union_subs[u].start.sub.name + " (" + findPrimary(globalEntities[i].union_subs[u].start.sub, false)[0] + ") ON DELETE SET NULL ON UPDATE CASCADE;" + '\n' + '\n';
                                      
                                       
                                        
                                    }
                                    
                                    // SUPERCLASSES / SPECIALIZATIONS
                                  
                                  for(var p = 0; p < globalEntities[i].specializations.length; p++ ){ 
                                       
                                      for (var q = 0; q < globalEntities[i].specializations[p].start.subs.length; q++){
                                          
                                          if(globalEntities[i].specializations[p].start.subs[q].start.super_specializations.length > 1 || globalEntities[i].specializations[p].start.subs[q].start.super !== 0 || globalEntities[i].specializations[p].start.subs[q].start.unions.length >= 1 ){
                                              
                                              txt1 = txt1 + '\t' + "FK_" + foreign_keys_count + "_" + findPrimary(globalEntities[i].specializations[p].start.subs[q].start, false)[0] + '\t' + findPrimary(globalEntities[i].specializations[p].start.subs[q].start, false)[2] + ',' + '\n';
                                               alter_table_case2 = alter_table_case2 + '\n' + "ALTER TABLE " + globalEntities[i].name + " ADD FOREIGN KEY ("  + "FK_" + foreign_keys_count + "_" + findPrimary(globalEntities[i].specializations[p].start.subs[q].start, false)[0] + ") " +  "REFERENCES " + globalEntities[i].specializations[p].start.subs[q].start.name + " (" + findPrimary(globalEntities[i].specializations[p].start.subs[q].start, false)[0] + ") ON DELETE SET NULL ON UPDATE CASCADE;" + '\n' + '\n';
                                          }
                                          
                                          
                                      }
                                      
                                  }
                                  
                                  for(p = 0; p < globalEntities[i].subs.length; p++ ){
                                      
                                      
                                         
                                          if(globalEntities[i].subs[p].start.super_specializations.length >= 1){
                                              
                                             txt1 = txt1 + '\t' + "FK_" + foreign_keys_count + "_" + findPrimary(globalEntities[i].subs[p].start, false)[0] + '\t' + findPrimary(globalEntities[i].subs[p].start, false)[2] + ',' + '\n';
                                             alter_table_case2 = alter_table_case2 + '\n' + "ALTER TABLE " + globalEntities[i].name + " ADD FOREIGN KEY ("  + "FK_" + foreign_keys_count + "_" + findPrimary(globalEntities[i].subs[p].start, false)[0] + ") " +  "REFERENCES " + globalEntities[i].subs[p].start.name + " (" + findPrimary(globalEntities[i].subs[p].start, false)[0] + ") ON DELETE SET NULL ON UPDATE CASCADE;" + '\n' + '\n';
                                         
                                              
                                          }
                                          
                                          if(globalEntities[i].subs[p].start.unions.length >= 1){
                                              
                                             txt1 = txt1 + '\t' + "FK_" + foreign_keys_count + "_" + findPrimary(globalEntities[i].subs[p].start, false)[0] + '\t' + findPrimary(globalEntities[i].subs[p].start, false)[2] + ',' + '\n';
                                             alter_table_case2 = alter_table_case2 + '\n' + "ALTER TABLE " + globalEntities[i].name + " ADD FOREIGN KEY ("  + "FK_" + foreign_keys_count + "_" + findPrimary(globalEntities[i].subs[p].start, false)[0] + ") " +  "REFERENCES " + globalEntities[i].subs[p].start.name + " (" + findPrimary(globalEntities[i].subs[p].start, false)[0] + ") ON DELETE SET NULL ON UPDATE CASCADE;" + '\n' + '\n';
                                         
                                              
                                          }
                                          
                                   
                                      foreign_keys_count ++;
                                      
                                      
                                  }
                                    
                                    
                                        
                                        if(globalEntities[i].super_specializations.length === 1 && globalEntities[i].super === 0 && globalEntities[i].unions.length === 0){ 
                                            
                                            txt1 = txt1 + "UNIQUE (" + primary_key_name + ")" + ',' + '\n' + "UNIQUE (" + findPrimary(globalEntities[i].super_specializations[0].end.super, true)[0] + ")" + '\n' + " )" + "INHERITS (" + globalEntities[i].super_specializations[0].end.super.name + ");" +  '\n'  +  '\n';
                                        
                                            
                                        }
                                
                                    
                                    else if(globalEntities[i].super !== 0 && globalEntities[i].super_specializations.length === 0 && globalEntities[i].unions.length === 0){
                                        
                                        txt1 = txt1 + "UNIQUE (" + primary_key_name + ")" + ',' + '\n' + "UNIQUE (" + findPrimary(globalEntities[i], true)[0] + ")" + '\n' + " )" + "INHERITS (" + globalEntities[i].super.name + ");" + '\n' + '\n';
                                        
                                    }
                                    
                                    else {
                                        
                                         txt1 = txt1 + "PRIMARY KEY (" + primary_key_name + ")" + " );" +  '\n' + '\n';;
                                    }
                                         
                                 
                                     
                                     txt = txt + txt1 + txt4;  
                                     
                                     
                                     
                                
                               
                            }
                            
                            var txt5 = "";
                            
                            for(i=0; i<globalRelationships.length; i++ ){
                                
                                
                                
                                var entities_count = 0; // count the number of entities participating in each relationship
                                var ratios = [];
                                
                                if(globalRelationships[i].topEntity !== 0){
                                    
                                    entities_count ++;
                                    ratios.push(globalRelationships[i].topLine.ratio);
                                    
                                }
                                
                                if(globalRelationships[i].botEntity !== 0){
                                    
                                    entities_count ++;
                                    ratios.push(globalRelationships[i].botLine.ratio);
                                    
                                }
                                
                                if(globalRelationships[i].leftEntity !== 0){
                                    
                                    entities_count ++;
                                    ratios.push(globalRelationships[i].leftLine.ratio);
                                    
                                }
                                
                                if(globalRelationships[i].rightEntity !== 0){
                                    
                                    entities_count ++;
                                    ratios.push(globalRelationships[i].rightLine.ratio);
                                    
                                }
                                
                                if(entities_count > 2){      // more than 2 connections
                                    
                                   txt5 = constructRelTable(globalRelationships[i]);
                                    
                                }
                                
                                else if(entities_count === 2){
                                    
                                    if((ratios[0] === "N" || ratios[0] === "M" || ratios[0] === "L" || ratios[0] === "K") && (ratios[1] === "N" || ratios[1] === "M" || ratios[1] === "L" || ratios[1] === "K")){
                                        
                                        txt5 = constructRelTable(globalRelationships[i]);
                                        
                                    }
                                    
                                    
                                    
                                }
                                
                              
                             
                               
                                
                            }
                            
                                txt = txt + txt5 + rel_txt2 + rel_txt3 + alter_table_case2;
                                
                                
                    
                                foreign_keys_count = 1;  // reset;
                               
                                return saveFile(this, 'generated_sql', txt , 'text/plain;charset=utf-8');
                                
                                
                                
                            } 
                            
                            for(i = 0; i<globalEntities.length; i++ ){
                                
                                if(globalEntities[i].type === "weak_entity"){ 
                                    
                                globalEntities[i].primary_datatypes = [];
                                globalEntities[i].weak_fkeys_names = [];
                                globalEntities[i].owners = [];
                                globalEntities[i].weak_fkeys = [];
                                globalEntities[i].primaries = [];
                                
                                }
                                
                            }
                            
                            
                            
                        };
                
               

                            // DIAGRAM GRAPHICS //


                            // Get height & width of container //


                            
                            basic_y = Math.floor(divHeight/2) - 30;
                            basic_x = Math.floor(divWidth/2) - 100;
                            
                            var entity_counter = 0;
                            var globalEntities = [];
                            
                            var attribute_counter = 0;
                            var globalAttributes = [];
                            
                            var relationship_counter = 0;
                            var globalRelationships = [];
                            
                            var globalSpecs_Unions = [];
                            var circle_counter = 0;
                            
                             // global variables for connections //
                            
                            var line_cr = 0; // for line connection  
                            
                            var sConnect = 0;  // for partial participation (relationships)
                            
                            var edge = 0;    
                            
                            var dConnect = 0; // for total participation  (relationships)
                           
                            var set_super = 0;
                            
                            var set_spec = 0;
                            
                            var union_super = 0;
                            
                            var set_union = 0;
                            
                            var remove_spec = 0;
                            
                            var remove_union = 0;
                            
                            var del_union_super = 0;
                            
                            var super_double = 0;
                            
                            var union_double = 0;
                            
                            var def_attribute = 0;
                            
                            var del_def_attribute = 0;
                            
                            var set_criteria = 0;
                            
                            var del_criteria = 0;
                           
                            var startP, endP;   // for lines
                            
                            
                            var lsvg = Snap('#svg');
                            
                            var L = lsvg.line(0,0,0,0).attr({
                                stroke: "#000",
                                strokeWidth: 3
                                });  
                 
                          
                         function createRect(rect_type, rect_name,superPermanentID, specializationList, defCriteriaList, unionSubsList, rx, ry){  
                            
                            var r = Snap('#svg');
                            
                            if(rect_type === "entity"){                            
                            
                                var newRect = r.rect(rx,ry,110,55);
                                newRect.attr({                                   
                                    fill:'#ccffe6',
                                    stroke:'#000',
                                    strokeWidth: 2
                                }); 
                                
                                 newRect.attr({

                                    id: "entity"

                                   })    

                            }                     
                            
                            else if (rect_type === "weak_entity"){
                                    
                                var outerBorder = r.rect(rx,ry,110,55);
                                outerBorder.attr({                            
                                    fill:'#ccffe6',
                                    stroke:'#000',
                                    strokeWidth: 2
                                });                                           
                                
                                var innerBorder = r.rect(rx + 7,ry + 5,96,45);
                                innerBorder.attr({                              
                                    fill:'#ccffe6',
                                    stroke:'#000',
                                    strokeWidth: 2
                                });  
                                
                                var newRect = r.group(outerBorder, innerBorder );
                                
                                
                                
                                newRect.primary_datatypes = [];
                                newRect.weak_fkeys_names = [];
                                newRect.owners = [];
                                newRect.weak_fkeys = [];
                                newRect.primaries = [];
                                
                                 newRect.attr({

                                    id: "weak_entity"

                                   })    

                                
                                      
                              }
                              
                             
                                  
                          
                            newRect.name = rect_name;
                            //newRect.name = "entity_" + entity_counter; 
                            var bb2 = newRect.getBBox();
                            var t1 = r.text(bb2.cx, bb2.cy, newRect.name);
                                                       
                            //var bb2 = newRect.getBBox();                        
                              
                           // var rwidth=bb2.width*0.8, rheight=bb2.height*0.8;    
                            
                           // var bb = t1.getBBox();
                            
                            //text scale ratio calculation
                           // var widthRatio = rwidth / bb.width;
                           // var heightRatio = rheight / bb.height;                           
                            
                            //var smallestRatio;
                            //if (widthRatio <= heightRatio) {
                                
                            //    smallestRatio = widthRatio;                            
                                
                           // }
                            
                           // else smallestRatio = heightRatio;                          
                            
                              
                            // var tstr = "s("+smallestRatio+","+smallestRatio+")";
                             //t1.transform(tstr);                                    
                           
                             //var newRect = r.group(tempRect, t1);
                            newRect.permanentID = "ent" + entity_counter;  
                            newRect.text = t1;        
                            newRect.attributes = [];     // list of  attribute lines connected to this shape   
                            newRect.relationships = [];  // list of  relationship lines connected to this shape   
                            newRect.type = rect_type;    
                            newRect.super = 0;         // entity superclass
                            newRect.superPermanentID = superPermanentID;
                            newRect.superLine = 0;    // in case it belongs to a superclass
                            newRect.subs = [];
                            newRect.specializations = [];
                            
                            newRect.super_specializations = [];
                            newRect.super_specializations_IDs = specializationList;
                            newRect.defCriteria = defCriteriaList;
                            
                            newRect.unions = [];
                            newRect.union_subs = [];
                            
                            newRect.sub_unions_IDs = unionSubsList;
                            
                            globalEntities.push(newRect);
                            newRect.click( this.clickTrigger );                            
                            newRect.dblclick( resizeHandler ); // start scaling upon double click                     
                            newRect.drag(); // use default drag() once shape is made 
                            entity_counter++;  
                            // bind to canvas
                            document.addEventListener('mousemove', function (e) {
    
                                    pos = newRect.getBBox();                                    
                                
                                    if(pos.cx < 0 || pos.cx > divWidth || pos.cy <0 || pos.cy > divHeight){                                
      
                                        newRect.animate({
                                            transform: 'T0 10 s1 1'
                                        }, 300, mina.easeinout);        
                                    };   
                                                                         
                            t1.attr({                                
                                text: newRect.name,                               
                                textAnchor: "middle",
                                x: pos.cx,
                                y: pos.cy                                 
                              });                      
                
                                }, false);    
                                
                               
                            
                          };
                         
                         function createCircle(c_type, permanentSuperID, defAttr, superDouble, permanentSubID, subDouble, x, y){                    
                             
                            var c = Snap('#svg');                            
                            
                                
                                var newCircle = c.circle(x,y,25);
                                newCircle.attr({                            
                                    fill:'#f2f4f3',
                                    stroke:'#000',
                                    strokeWidth: 2
                                });                          
                                
                                      
                            
                            if(c_type === "disjoint"){
                                
                               newCircle.name = "d";  
                               
                               newCircle.attr({                            
                                    id: "spec"
                                    
                                }); 
                                
                                globalSpecs_Unions.push(newCircle);
                                
                            }
                            
                            else if(c_type === "overlapping"){
                                
                               newCircle.name = "o"; 
                               
                               newCircle.attr({                            
                                    id: "spec"                                    
                                });
                                
                                globalSpecs_Unions.push(newCircle);
                                
                            }
                            
                            else if(c_type === "union"){
                                
                               newCircle.name = "U";  
                               
                               newCircle.attr({                            
                                    id: "union"
                                    
                                }); 
                                
                                globalSpecs_Unions.push(newCircle);
                                
                            }
                            
                             
                             var bb2 = newCircle.getBBox();                       
                             var t1 = c.text(bb2.cx, bb2.cy + 5, newCircle.name);
                             
                             // for specializations
                            
                            newCircle.text = t1;                            
                            newCircle.type = c_type;          // type                            
                            newCircle.super = 0;            // owner
                            newCircle.superPermanentID = permanentSuperID;
                            newCircle.superDouble = (superDouble === "true");
                            newCircle.superLine = 0;        // line connecting to superclass
                            newCircle.subs = [];          // subclasses
                            newCircle.defAttr = defAttr;  // defining attribute
                            
                            // for unions
                            
                            newCircle.sub = 0;
                            newCircle.subID = permanentSubID;  // single entity sub
                            newCircle.subDouble = (subDouble === "true");  // type of connection
                            newCircle.unionLine = 0;      // allows union to only have one subclass
                            newCircle.supers = [];       // superclasses
                            newCircle.permanentID = "circle" + circle_counter;
                            circle_counter++;
                            newCircle.click( this.clickTrigger );
                            
                            newCircle.drag();   
                            
                             document.addEventListener('mousemove', function (e) {
    
                                    pos = newCircle.getBBox();                                    
                                
                                    if(pos.cx < 0 || pos.cx > divWidth || pos.cy <0 || pos.cy > divHeight){                                
      
                                        newCircle.animate({
                                            transform: 'T0 0 s1 1'
                                        }, 300, mina.easeinout);        
                                    };           
                                    
                                                  
                                    t1.attr({                                
                                        text: newCircle.name,                               
                                        textAnchor: "middle",                                      
                                        x: pos.cx,
                                        y: pos.cy + 5                                 
                                      });              
                
                                }, false);   
                         };
                        
                         function createEllipse(ell_type, ell_name, data, n, i, j, primary, unique, notnull, ownerPermanentID, x, y){                    
                           
                             
                            var e = Snap('#svg');
                            
                            
                            
                            if(ell_type === "attribute"){
                                
                                var newEllipse = e.ellipse(x,y,60,25);
                                newEllipse.attr({                            
                                    fill:'#ccdaff',
                                    stroke:'#000',
                                    strokeWidth: 2,
                                    id: "attribute"
                                });   
                                
                                                           
                             }
                            
                            else if (ell_type === "derived_attribute"){
                                
                                var newEllipse = e.ellipse(x,y,60,25);
                                newEllipse.attr({                            
                                    fill:'#ccdaff',
                                    stroke:'#000',
                                    strokeDasharray: 10,
                                    strokeWidth: 2,
                                    id: "derived_attribute"
                                   
                                });         
                                
                            }
                            
                             else if (ell_type === "multi_attribute"){                                
                                
                                var outerEllipse = e.ellipse(x,y,60,25);
                                outerEllipse.attr({                            
                                    fill:'#ccdaff',
                                    stroke:'#000',
                                    strokeWidth: 2
                                });      
                                
                                var innerEllipse = e.ellipse(x,y,51,19);
                                innerEllipse.attr({                            
                                    fill:'#ccdaff',
                                    stroke:'#000',
                                    strokeWidth: 2
                                });   
                                
                                var newEllipse = e.group(outerEllipse, innerEllipse);  
                                newEllipse.attr({                            
                                    
                                    id: "multi_attribute"
                                   
                                });  
                                
                                
                            }           
                            
                             
                             
                             newEllipse.name = ell_name;
                             newEllipse.permanentID = "ell" + attribute_counter;
                             var bb2 = newEllipse.getBBox();                       
                             var t1 = e.text(bb2.cx, bb2.cy, newEllipse.name);
                            
                            newEllipse.text = t1;
                            newEllipse.attributes = [];            // list of  lines connected to this shape
                            newEllipse.type = ell_type;          // type
                            newEllipse.dataT = data;       // data type
                            newEllipse.n = n;                  // characters/bits
                            newEllipse.i = i;
                            newEllipse.j = j;                // scale
                            newEllipse.owner = 0;            // owner
                            newEllipse.ownerLine = 0;        // line connecting to owner
                            newEllipse.ownerPermanentID = ownerPermanentID; // used for saving & loading
                            newEllipse.primary = (primary === "true");
                            newEllipse.unique = (unique === "true");
                            newEllipse.notNull = (notnull === "true");
                            globalAttributes.push(newEllipse);
                            newEllipse.click( this.clickTrigger );
                            newEllipse.dblclick( resizeHandler ); // start scaling upon double click
                            newEllipse.drag();   
                            attribute_counter++;
                             document.addEventListener('mousemove', function (e) {
    
                                    pos = newEllipse.getBBox();                                    
                                
                                    if(pos.cx < 0 || pos.cx > divWidth || pos.cy <0 || pos.cy > divHeight){                                
      
                                        newEllipse.animate({
                                            transform: 'T0 0 s1 1'
                                        }, 300, mina.easeinout);        
                                    };                            
                                   
                                    
                                    if( newEllipse.primary === true){
                                         t1.attr({        
                                             
                                            fontWeight: "bold", 
                                            textDecoration: "underline"
                                            
                                        });                                 
                                    }
                                    
                                    else if( newEllipse.primary === false && newEllipse.unique === true){
                                         t1.attr({    
                                            fontWeight: "normal", 
                                            textDecoration: "underline"                                           
                                        });                                 
                                    }
                                    
                                    else {
                                         t1.attr({          
                                            fontWeight: "normal", 
                                            textDecoration: "none"                                                           
                                        });                                 
                                    }                                  
                                    
                                                                                     
                                    t1.attr({                                
                                        text: newEllipse.name,                               
                                        textAnchor: "middle",                                      
                                        x: pos.cx,
                                        y: pos.cy                                 
                                      });              
                
                                }, false);   
                         };                 
                    
                         function createRhombus(rhombus_type, rhombus_name, topID, botID, leftID, rightID, topDouble, botDouble, leftDouble, rightDouble, topRatio, botRatio, leftRatio, rightRatio, x, y){                            
                             
                            var r = Snap('#svg');
                            
                            
                            
                            if(rhombus_type === "relationship"){
                            
                                var newRhombus = r.rect(x,y,75,75);
                                newRhombus.attr({                            
                                    fill:'#ffffff',
                                    stroke:'#000',
                                    strokeWidth: 2
                                });                   
                            
                             }
                             
                             else if (rhombus_type === "identifying_rel"){
                                 
                                  var outerBorder = r.rect(x,y,75,75);
                                outerBorder.attr({                            
                                    fill:'#ffffff',
                                    stroke:'#000',
                                    strokeWidth: 2
                                });                                         
                                
                                var innerBorder = r.rect(x + 8,y + 8,60,60);
                                innerBorder.attr({                            
                                    fill:'#ffffff',
                                    stroke:'#000',
                                    strokeWidth: 2
                                });             
                                
                                var newRhombus = r.group(outerBorder, innerBorder );                            
                                 
                                 
                             }
                            
                            newRhombus.transform( 'r45,basic_x,basic_y' );      // rotate
                            newRhombus.attr({                            
                                    id: "relationship"
                                });                  
                            newRhombus.name = rhombus_name; 
                            
                            var bb2 = newRhombus.getBBox();
                            var t1 = r.text(bb2.cx, bb2.cy, newRhombus.name);
                            
                            

                            newRhombus.text = t1;        
                            newRhombus.attributes = [];     // list of  attribute lines connected to this shape   
                            
                            newRhombus.leftLine = 0;    
                            newRhombus.rightLine = 0;
                            newRhombus.topLine = 0; 
                            newRhombus.botLine = 0;  
                            
                            newRhombus.leftID = leftID;    
                            newRhombus.rightID = rightID;
                            newRhombus.topID = topID; 
                            newRhombus.botID = botID;  
                            
                            newRhombus.leftDouble = ( leftDouble==="true" );    
                            newRhombus.rightDouble = ( rightDouble === "true");
                            newRhombus.topDouble = ( topDouble === "true"); 
                            newRhombus.botDouble = ( botDouble === "true"); 
                            
                            newRhombus.leftRatio = leftRatio;    
                            newRhombus.rightRatio = rightRatio;
                            newRhombus.topRatio = topRatio; 
                            newRhombus.botRatio = botRatio;
                            
                            newRhombus.visited = false;
                            newRhombus.leftEntity = 0;    
                            newRhombus.rightEntity = 0;
                            newRhombus.topEntity = 0; 
                            newRhombus.botEntity = 0;
                            newRhombus.permanentID = "rel" + relationship_counter;
                            newRhombus.type = rhombus_type;                         
                            globalRelationships.push(newRhombus);
                            newRhombus.click( this.clickTrigger );
                            newRhombus.dblclick( resizeHandler ); // start scaling upon double click
                            newRhombus.drag();    
                            relationship_counter ++;
                             document.addEventListener('mousemove', function (e) {
    
                                    pos = newRhombus.getBBox();                                    
                                
                                    if(pos.cx < 0 || pos.cx > divWidth || pos.cy <0 || pos.cy > divHeight){                                
      
                                        newRhombus.animate({
                                            transform: 'T0 0 s1 1 r45,basic_x,basic_y'
                                        }, 300, mina.easeinout);        
                                    };   
                                    
                                    t1.attr({                                
                                        text: newRhombus.name,                               
                                        textAnchor: "middle",
                                        x: pos.cx,
                                        y: pos.cy                                 
                                      });           
                
                                }, false);   
                         }; 
                         
                       
                         // FUNCTIONS //
                         
                           
                             var scaling = 0;   // check if user is resizing or not
                             
                             function resizeHandler() {                       
                                 
                                if( scaling === 0 ) {    //initialize scaling, start dragging
                                    document.getElementById('svg').style.cursor = 'ne-resize';
                                    scaling = 1;                                   
                                    var bb = this.getBBox();                                    
                                    this.drag(move,start,stop);  // use drag() with custom  arguments
                                    
                                    
                                } else {  
                                    document.getElementById('svg').style.cursor = 'move';
                                    scaling = 0;   // stopped dragging
                                    this.undrag(); // remove custom arguments (move, start,stop) from drag()
                                    this.drag();  // use default drag() again                                                                      
                                  }                                      
                            };

                            function start() {
                                
                                this.data('origTransform', this.transform().local);
                                
                            };

                            function move(dx,dy) {
                                
                                 var scale = 1 + dx / 50;
                                 this.attr({
                                 transform: this.data('origTransform') + (this.data('origTransform') ? "S" : "s") + scale                                 
                                 });
                                 
                            };
                            
                            function stop() {}; 
                            
                           
                            function connectAttrToOwner (){
                                
                                
                                  var LLocal = lsvg.line(0,0,0,0).attr({
                                    stroke: "#000",
                                    strokeWidth: 2
                                  }); 
                                  
                                  LLocal.start = L.start;
                                  LLocal.end = L.end; 
                                  
                                  LLocal.start.owner = L.end;    // udate attribute owner 
                                  LLocal.start.ownerLine = LLocal;  // update owner line
                                  LLocal.end.attributes.push(LLocal);   // add line to list of attributes  of end point                              
                                  
                                 document.addEventListener('mousemove', function (e) {
                                  
                                 startP = LLocal.start.getBBox();  
                                 endP = LLocal.end.getBBox();
                                 

                                 LLocal.attr({x1: startP.x2, y1: startP.cy, x2: endP.x, y2: endP.cy});  // start point is on the left side of end point
                                 
                                 
                                 if(startP.cx > endP.cx){     // start point is on the right side of end point
                                     
                                  LLocal.attr({x1: startP.x, y1: startP.cy, x2: endP.x2, y2: endP.cy});
                                     
                                 }
                                 
                                 if((startP.cy - endP.cy) > 100){   // start point is below end point
                                     
                                   LLocal.attr({x1: startP.cx, y1: startP.y, x2: endP.cx, y2: endP.y2});
                                     
                                 }
                                 
                                  if((endP.cy - startP.cy) > 100  ){  // start point is above end point
                                     
                                   LLocal.attr({x1: startP.cx, y1: startP.y2, x2: endP.cx, y2: endP.y});
                                     
                                 }
                                
                                
                
                                }, false);  
                                
                                
                                
                                
                            };
                            
                            function connectToSuper() {
                               
                                 if(((L.start.type === "entity" || L.start.type === "weak_entity")  ) || (L.start.type === "disjoint" || L.start.type === "overlapping")){
                                     if((L.start.type === "entity" || L.start.type === "weak_entity")){
                                     
                                    
                                    var arrow = lsvg.path("M6,10 Q3,0 0,10").attr({stroke: '#000', fill:"none" }).transform('r270');


                                    //var arrow = lsvg.text(2,0,"U");
                                    var marker = arrow.marker(0,0, 10,35, -20,7);

                                    var LLocal = lsvg.line(0,0,0,0).attr({
                                      stroke: "#000",
                                      strokeWidth: 2,
                                      markerStart: marker

                                    });    
                                    
                                     LLocal.companion = 0;
                                     LLocal.attribute = " ";
                                     var t1 = lsvg.text(0, 0, " ");
                                     LLocal.text = t1;
                                   
                                      
                                  }
                                   
                                  else if((L.start.type === "disjoint" || L.start.type === "overlapping") ){ 
                                     
                                      if(super_double === 0){
                                          
                                            var LLocal = lsvg.line(0,0,0,0).attr({
                                            stroke: "#000",
                                            strokeWidth: 2                                          

                                          });   
                                          
                                         
                                          
                                          LLocal.companion = 0;                                         
                                          
                                          
                                      }
                                      
                                      else if (super_double === 1){
                                          
                                          var LLocal = lsvg.line(0,0,0,0).attr({
                                            stroke: "#000",
                                            strokeWidth: 5
                                          });                                  
                                  
                                            var Companion = lsvg.line(0,0,0,0).attr({
                                            stroke: "#f2f4f3",
                                            strokeWidth: 2
                                          });                                                        
                                  
                                            LLocal.companion = Companion;  
                                           
                                      }
                                      
                                      super_double = 0;
                                      
                                      LLocal.attribute = " ";     // defining attribute
                                      
                                      var t1 = lsvg.text(0, 0, LLocal.attribute);
                                      LLocal.text = t1;

                                    
                                  }                                  
                                 
                                 
                                  LLocal.start = L.start;
                                  LLocal.end = L.end; 
                                  
                                  
                                  LLocal.start.super = L.end;    // udate attribute owner 
                                  LLocal.start.superLine = LLocal;  // update owner line
                                  
                                  if(L.start.type === "entity" || L.start.type === "weak_entity" ){
                                    
                                     LLocal.end.subs.push(LLocal);   // add line to list of subs  of end point
                                    
                                  }
                                  
                                  else {                              

                                    LLocal.end.specializations.push(LLocal);   // add line to list of attributes  of end point      
                                      
                                  }                                                             
                                  
                                 document.addEventListener('mousemove', function (e) {
                                  
                                 startP = LLocal.start.getBBox();  
                                 endP = LLocal.end.getBBox();
                                 
                                 
                                 LLocal.text.attr({                                
                                    text: LLocal.attribute       
                                  });  
                                  
                                 
                                   if(LLocal.attribute !== ""){   
                                     
                                     
                                    // start point is on the left side of end point 
                                    LLocal.text.attr({                                
                                    text: LLocal.attribute,                               
                                    textAnchor: "middle",
                                    x: startP.x2 + 70,
                                    y: startP.cy - 20                                
                                  });                                     
                                        
                                 
                                 
                                    if(startP.cx > endP.cx){     // start point is on the right side of end point

                                     LLocal.text.attr({x: startP.x - 70, y: startP.cy - 20});                                   
                                             

                                    }

                                    if((startP.cy - endP.cy) > 100){   // start point is below end point

                                      LLocal.text.attr({x: startP.cx + 20, y: startP.y - 70});

                                    }

                                     if((endP.cy - startP.cy) > 100  ){  // start point is above end point

                                      LLocal.text.attr({x: startP.cx + 20, y: startP.y2 + 70});

                                    }
                                     
                                 }
                                 
                                 if(LLocal.companion !== 0){
                                     
                                     LLocal.companion.attr({x1: startP.x2, y1: startP.cy, x2: endP.x, y2: endP.cy});  // start point is on the left side of end point
                                 
                                 
                                    if(startP.cx > endP.cx){     // start point is on the right side of end point

                                     LLocal.companion.attr({x1: startP.x, y1: startP.cy, x2: endP.x2, y2: endP.cy});

                                    }

                                    if((startP.cy - endP.cy) > 100){   // start point is below end point

                                      LLocal.companion.attr({x1: startP.cx, y1: startP.y, x2: endP.cx, y2: endP.y2});

                                    }

                                     if((endP.cy - startP.cy) > 100  ){  // start point is above end point

                                      LLocal.companion.attr({x1: startP.cx, y1: startP.y2, x2: endP.cx, y2: endP.y});

                                    }
                                     
                                     
                                 }
                                 

                                 LLocal.attr({x1: startP.x2, y1: startP.cy, x2: endP.x, y2: endP.cy});  // start point is on the left side of end point
                                 
                                 
                                 if(startP.cx > endP.cx){     // start point is on the right side of end point
                                     
                                  LLocal.attr({x1: startP.x, y1: startP.cy, x2: endP.x2, y2: endP.cy});
                                     
                                 }
                                 
                                 if((startP.cy - endP.cy) > 100){   // start point is below end point
                                     
                                   LLocal.attr({x1: startP.cx, y1: startP.y, x2: endP.cx, y2: endP.y2});
                                     
                                 }
                                 
                                  if((endP.cy - startP.cy) > 100  ){  // start point is above end point
                                     
                                   LLocal.attr({x1: startP.cx, y1: startP.y2, x2: endP.cx, y2: endP.y});
                                     
                                 }
                                
                                
                
                                }, false);  
                                
                                
                                
                                 }
                                
                                
                            };
                            
                            function connectRelToEntityPartial(){
                                
                                
                                  
                                  var LLocal = lsvg.line(0,0,0,0).attr({
                                    stroke: "#000",
                                    strokeWidth: 2
                                  });           
                                 
                                  
                                  LLocal.start = L.start;
                                  LLocal.end = L.end; 
                                  LLocal.side = edge;
                                  LLocal.type = "partial";
                                  LLocal.companion = 0;
                                  LLocal.ratio = "1";
                                  
                                  
                                 startP = LLocal.start.getBBox();  
                                 
                                  
                                 var ratio = lsvg.text(startP.cx, startP.cy, LLocal.ratio);
                                 
                                 LLocal.text = ratio;
                                  
                                  
                                  edge = 0;
                                 
                                  
                                 switch (LLocal.side){
                                     
                                     case 1:

                                            {   LLocal.start.topEntity = L.end;    // udate left entity 
                                                LLocal.start.topLine = LLocal;  // update left line
                                            }
                                            break;
                                    case 2:

                                            {   LLocal.start.botEntity = L.end;    // udate left entity 
                                                LLocal.start.botLine = LLocal;  // update left line
                                            }
                                            break; 
                                            
                                    case 3:

                                            { 
                                                LLocal.start.leftEntity = L.end;    // udate left entity 
                                                LLocal.start.leftLine = LLocal;  // update left line
                                            }
                                            break;
                                    case 4:

                                            { 
                                                LLocal.start.rightEntity = L.end;    // udate left entity 
                                                LLocal.start.rightLine = LLocal;  // update left line
                                            }
                                            break;                    
                                     
                             }
                                  
                                 LLocal.end.relationships.push(LLocal);   // add line to list of relationships of end point                              
                                  
                                 document.addEventListener('mousemove', function (e) {
                                  
                                 startP = LLocal.start.getBBox();  
                                 endP = LLocal.end.getBBox();
                                 
                                 var xstart;
                                 var ystart;
                                 
                                 var xstart_ratio;
                                 var ystart_ratio;
                                 
                                 switch (LLocal.side){
                                     
                                     case 1:

                                            {  
                                                xstart = startP.cx;
                                                ystart = startP.y;
                                                
                                                xstart_ratio = xstart + 10;
                                                ystart_ratio = ystart - 10;
                                                
                                            }
                                            break;
                                    case 2:

                                            {   
                                                xstart = startP.cx;
                                                ystart = startP.y2;
                                                
                                                xstart_ratio = xstart + 10;
                                                ystart_ratio = ystart + 10;
                                            }
                                            break; 
                                            
                                    case 3:

                                            { 
                                                xstart = startP.x; 
                                                ystart = startP.cy;
                                                
                                                xstart_ratio = xstart - 10;
                                                ystart_ratio = ystart + 20;
                                            }
                                            break;
                                    case 4:

                                            { 
                                                xstart = startP.x2;
                                                ystart = startP.cy;
                                                
                                                xstart_ratio = xstart + 10;
                                                ystart_ratio = ystart - 10;
                                            }
                                            break;                    
                                     
                             }                             
                                 

                                 LLocal.attr({x1: xstart, y1: ystart, x2: endP.x, y2: endP.cy});  // start point is on the left side of end point
                                 
                                 ratio.attr({                                
                                    text: LLocal.ratio,                               
                                    textAnchor: "middle",
                                    x: xstart_ratio,
                                    y: ystart_ratio                                 
                                  });   
                                                                  
                                 
                                 if(startP.cx > endP.cx){     // start point is on the right side of end point
                                     
                                  LLocal.attr({x1: xstart, y1: ystart, x2: endP.x2, y2: endP.cy});
                                  
                                     
                                 }
                                 
                                 if((startP.cy - endP.cy) > 100){   // start point is below end point
                                     
                                   LLocal.attr({x1: xstart, y1: ystart, x2: endP.cx, y2: endP.y2});
                                    
                                     
                                 }
                                 
                                  if((endP.cy - startP.cy) > 100  ){  // start point is above end point
                                     
                                   LLocal.attr({x1: xstart, y1: ystart, x2: endP.cx, y2: endP.y});
                                   
                                     
                                 }
                                
                
                                }, false);  
                                
                                
                                
                                
                            };
                            
                            function connectRelToEntityTotal(){
                             
                             
                                
                                  
                                  var LLocal = lsvg.line(0,0,0,0).attr({
                                    stroke: "#000",
                                    strokeWidth: 5
                                  }); 
                                  
                                  
                                      
                                    var Companion = lsvg.line(0,0,0,0).attr({
                                    stroke: "#f2f4f3",
                                    strokeWidth: 2
                                  }); 
                                      
                                                                  
                                  
                                  LLocal.start = L.start;
                                  LLocal.end = L.end; 
                                  LLocal.side = edge;
                                  LLocal.type = "total";
                                  LLocal.companion = Companion;  
                                  LLocal.ratio = "1";
                                  
                                  
                                 startP = LLocal.start.getBBox();                                  
                                  
                                 var ratio = lsvg.text(startP.cx, startP.cy, LLocal.ratio);
                                 
                                 LLocal.text = ratio;                                
                                  
                                  
                                  edge = 0;                              
                                  
                                 switch (LLocal.side){
                                     
                                     case 1:

                                            {   LLocal.start.topEntity = L.end;    // udate left entity 
                                                LLocal.start.topLine = LLocal;  // update left line
                                            }
                                            break;
                                    case 2:

                                            {   LLocal.start.botEntity = L.end;    // udate left entity 
                                                LLocal.start.botLine = LLocal;  // update left line
                                            }
                                            break; 
                                            
                                    case 3:

                                            { 
                                                LLocal.start.leftEntity = L.end;    // udate left entity 
                                                LLocal.start.leftLine = LLocal;  // update left line
                                            }
                                            break;
                                    case 4:

                                            { 
                                                LLocal.start.rightEntity = L.end;    // udate left entity 
                                                LLocal.start.rightLine = LLocal;  // update left line
                                            }
                                            break;                    
                                     
                             }
                                  
                                  LLocal.end.relationships.push(LLocal);   // add line to list of relationships of end point                              
                                  
                                 document.addEventListener('mousemove', function (e) {
                                  
                                 startP = LLocal.start.getBBox();  
                                 endP = LLocal.end.getBBox();
                                 
                                 var xstart;
                                 var ystart;
                                 
                                 var xstart_ratio;
                                 var ystart_ratio;
                                 
                                   switch (LLocal.side){
                                     
                                     case 1:

                                            {  
                                                xstart = startP.cx;
                                                ystart = startP.y;
                                                
                                                xstart_ratio = xstart + 10;
                                                ystart_ratio = ystart - 10;
                                                
                                            }
                                            break;
                                    case 2:

                                            {   
                                                xstart = startP.cx;
                                                ystart = startP.y2;
                                                
                                                xstart_ratio = xstart + 10;
                                                ystart_ratio = ystart + 10;
                                            }
                                            break; 
                                            
                                    case 3:

                                            { 
                                                xstart = startP.x; 
                                                ystart = startP.cy;
                                                
                                                xstart_ratio = xstart - 10;
                                                ystart_ratio = ystart + 20;
                                            }
                                            break;
                                    case 4:

                                            { 
                                                xstart = startP.x2;
                                                ystart = startP.cy;
                                                
                                                xstart_ratio = xstart + 10;
                                                ystart_ratio = ystart - 10;
                                            }
                                            break;                    
                                     
                             }                
                                 

                                 LLocal.attr({x1: xstart, y1: ystart, x2: endP.x, y2: endP.cy});  // start point is on the left side of end point
                               
                                 Companion.attr({x1: xstart, y1: ystart, x2: endP.x, y2: endP.cy});
                                 
                                 ratio.attr({                                
                                    text: LLocal.ratio,                               
                                    textAnchor: "middle",
                                    x: xstart_ratio,
                                    y: ystart_ratio                                 
                                  });  
                                 
                                 if(startP.cx > endP.cx){     // start point is on the right side of end point
                                     
                                  LLocal.attr({x1: xstart, y1: ystart, x2: endP.x2, y2: endP.cy});
                                  
                                  Companion.attr({x1: xstart, y1: ystart, x2: endP.x2, y2: endP.cy});
                                
                                     
                                 }
                                 
                                 if((startP.cy - endP.cy) > 100){   // start point is below end point
                                     
                                   LLocal.attr({x1: xstart, y1: ystart, x2: endP.cx, y2: endP.y2});
                                   
                                   Companion.attr({x1: xstart, y1: ystart, x2: endP.cx, y2: endP.y2});
                                     
                                 }
                                 
                                  if((endP.cy - startP.cy) > 100  ){  // start point is above end point
                                     
                                   LLocal.attr({x1: xstart, y1: ystart, x2: endP.cx, y2: endP.y});
                                 
                                  Companion.attr({x1: xstart, y1: ystart, x2: endP.cx, y2: endP.y});
                                     
                                 }
                                
                                
                
                                }, false);  
                                
                                
                                    
                             
                             
                             
                         };
                                
                            function connectEntityToSpecialization(str) {
                             
                             var flag = 0; // check if this line already exists
                             var i = 0;     
                                  for(i=0; i<L.start.super_specializations.length; i++){
                                      
                                      if(L.start.super_specializations[i].end === this){
                                          
                                          flag = 1;
                                          
                                      }                      
                                      
                                  }
                                 
                                  if(flag !== 1){                        


                                        var arrow = lsvg.path("M6,10 Q3,0 0,10").attr({stroke: '#000', fill:"none" }).transform('r270');


                                        //var arrow = lsvg.text(2,0,"U");
                                        var marker = arrow.marker(0,0, 10,35, -20,7);

                                        var LLocal = lsvg.line(0,0,0,0).attr({
                                          stroke: "#000",
                                          strokeWidth: 2,
                                          markerStart: marker

                                        });                                             


                                      LLocal.start = L.start;
                                      LLocal.end = L.end; 
                                      
                                      LLocal.criteria = str;
                                      var t1 = lsvg.text(0, 0, LLocal.criteria);
                                      LLocal.text = t1;


                                      LLocal.start.super_specializations.push(LLocal);   // add line to list of super specializations  of start point



                                      LLocal.end.subs.push(LLocal);   // add line to list of subs  of end point


                                     document.addEventListener('mousemove', function (e) {

                                     startP = LLocal.start.getBBox();  
                                     endP = LLocal.end.getBBox();                                 
                                     
                                      LLocal.text.attr({    
                                          
                                        text: LLocal.criteria                            

                                      });  
                                     
                                     if(LLocal.criteria !== ""){
                                         
                                          
                                    // start point is on the left side of end point 
                                    LLocal.text.attr({                                
                                    text: LLocal.criteria,                               
                                    textAnchor: "middle",
                                    x: startP.x2 + 70,
                                    y: startP.cy - 20                                
                                  });                                     
                                        
                                 
                                 
                                    if(startP.cx > endP.cx){     // start point is on the right side of end point

                                     LLocal.text.attr({x: startP.x - 70, y: startP.cy - 20});                                   
                                             

                                    }

                                    if((startP.cy - endP.cy) > 100){   // start point is below end point

                                      LLocal.text.attr({x: startP.cx + 20, y: startP.y - 70});

                                    }

                                     if((endP.cy - startP.cy) > 100  ){  // start point is above end point

                                      LLocal.text.attr({x: startP.cx + 20, y: startP.y2 + 70});

                                    }
                                         
                                         
                                         
                                     }
                                         

                                     LLocal.attr({x1: startP.x2, y1: startP.cy, x2: endP.x, y2: endP.cy});  // start point is on the left side of end point


                                     if(startP.cx > endP.cx){     // start point is on the right side of end point

                                      LLocal.attr({x1: startP.x, y1: startP.cy, x2: endP.x2, y2: endP.cy});

                                     }

                                     if((startP.cy - endP.cy) > 100){   // start point is below end point

                                       LLocal.attr({x1: startP.cx, y1: startP.y, x2: endP.cx, y2: endP.y2});

                                     }

                                      if((endP.cy - startP.cy) > 100  ){  // start point is above end point

                                       LLocal.attr({x1: startP.cx, y1: startP.y2, x2: endP.cx, y2: endP.y});

                                     }


                                    }, false);   

                                 }
                             
                             
                             
                             
                         };       
                         
                            function connectUnionToSuper() {
                             
                             
                             var flag = 0; // check if this line already exists
                             var i = 0;
                                  
                                  for(i=0; i<L.start.supers.length; i++){
                                      
                                      if(L.start.supers[i].end === L.end){
                                          
                                          flag = 1;
                                          
                                      }                      
                                      
                                  }
                                 
                                  if(flag !== 1){                        



                                        var LLocal = lsvg.line(0,0,0,0).attr({
                                          stroke: "#000",
                                          strokeWidth: 2 
                                      });                                             


                                      LLocal.start = L.start;
                                      LLocal.end = L.end; 


                                      LLocal.start.supers.push(LLocal);   // add line to list of supers of start point
                                      LLocal.end.union_subs.push(LLocal);   // add line to list of subs  of end point


                                     document.addEventListener('mousemove', function (e) {

                                     startP = LLocal.start.getBBox();  
                                     endP = LLocal.end.getBBox();                                 


                                     LLocal.attr({x1: startP.x2, y1: startP.cy, x2: endP.x, y2: endP.cy});  // start point is on the left side of end point


                                     if(startP.cx > endP.cx){     // start point is on the right side of end point

                                      LLocal.attr({x1: startP.x, y1: startP.cy, x2: endP.x2, y2: endP.cy});

                                     }

                                     if((startP.cy - endP.cy) > 100){   // start point is below end point

                                       LLocal.attr({x1: startP.cx, y1: startP.y, x2: endP.cx, y2: endP.y2});

                                     }

                                      if((endP.cy - startP.cy) > 100  ){  // start point is above end point

                                       LLocal.attr({x1: startP.cx, y1: startP.y2, x2: endP.cx, y2: endP.y});

                                     }


                                    }, false);   

                                 }
                             
                         };
                         
                         
                            function connectEntityToUnion() {
                             
                             if (L.end.sub !== 0){    // unions can only have one subclass
                                      
                                      var indexE = L.end.sub.unions.indexOf(L.end.unionLine);  // remove old subclass first
                                      L.end.sub.unions.splice(indexE,1);  
                                      
                                      if(L.end.unionLine.companion !== 0){
                                          
                                          L.end.unionLine.companion.remove();
                                          
                                      }
                                      
                                      L.end.unionLine.remove();
                                      L.end.sub = 0;                                      
                                      
                                  }
                                  
                                   if(union_double === 0){
                                          
                                           
                                        var arrow = lsvg.path("M6,10 Q3,0 0,10").attr({stroke: '#000', fill:"none" }).transform('r270');


                                        var marker = arrow.marker(0,0, 10,35, -20,7);

                                        var LLocal = lsvg.line(0,0,0,0).attr({
                                          stroke: "#000",
                                          strokeWidth: 2,
                                          markerStart: marker

                                        });           
                                          
                                          LLocal.companion = 0;
                                          
                                          
                                      }
                                      
                                      else if (union_double === 1){
                                          
                                            var arrow = lsvg.path("M6,10 Q3,0 0,10").attr({stroke: '#000', fill:"none" }).transform('r270');


                                            var marker = arrow.marker(0,0, 10,35, -20,7);

                                            var LLocal = lsvg.line(0,0,0,0).attr({
                                              stroke: "#000",
                                              strokeWidth: 5
                                             

                                            });                                          
                                  
                                      
                                            var Companion = lsvg.line(0,0,0,0).attr({
                                            stroke: "#f2f4f3",
                                            strokeWidth: 2,
                                             markerStart: marker
                                          });                                                        
                                  
                                            LLocal.companion = Companion;  
                                           
                                      }
                                      
                                      union_double = 0;                      


                                      LLocal.start = L.start;
                                      LLocal.end = L.end; 
                                     


                                      LLocal.start.unions.push(LLocal);   // add line to list of entity's unions
                                      LLocal.end.sub = LLocal.start;   //  add entity as the union's subclass
                                      LLocal.end.unionLine = LLocal;   // update union line


                                     document.addEventListener('mousemove', function (e) {

                                     startP = LLocal.start.getBBox();  
                                     endP = LLocal.end.getBBox();    
                                     
                                     if(LLocal.companion !== 0){
                                     
                                            LLocal.companion.attr({x1: startP.x2, y1: startP.cy, x2: endP.x, y2: endP.cy});  // start point is on the left side of end point


                                           if(startP.cx > endP.cx){     // start point is on the right side of end point

                                            LLocal.companion.attr({x1: startP.x, y1: startP.cy, x2: endP.x2, y2: endP.cy});

                                           }

                                           if((startP.cy - endP.cy) > 100){   // start point is below end point

                                             LLocal.companion.attr({x1: startP.cx, y1: startP.y, x2: endP.cx, y2: endP.y2});

                                           }

                                            if((endP.cy - startP.cy) > 100  ){  // start point is above end point

                                             LLocal.companion.attr({x1: startP.cx, y1: startP.y2, x2: endP.cx, y2: endP.y});

                                           }                                     
                                     
                                     }                                   
                                     


                                     LLocal.attr({x1: startP.x2, y1: startP.cy, x2: endP.x, y2: endP.cy});  // start point is on the left side of end point


                                     if(startP.cx > endP.cx){     // start point is on the right side of end point

                                      LLocal.attr({x1: startP.x, y1: startP.cy, x2: endP.x2, y2: endP.cy});

                                     }

                                     if((startP.cy - endP.cy) > 100){   // start point is below end point

                                       LLocal.attr({x1: startP.cx, y1: startP.y, x2: endP.cx, y2: endP.y2});

                                     }

                                      if((endP.cy - startP.cy) > 100  ){  // start point is above end point

                                       LLocal.attr({x1: startP.cx, y1: startP.y2, x2: endP.cx, y2: endP.y});

                                     }


                                    }, false);   

                             
                             
                         };
                                
                            function clickTrigger () {                         
                                
                                 // ENTITY SUPERCLASS-SUBCLASS  //
                                                         
                                
                                
                                if ((set_super === 2)  && (L.start !== this) && (this.type === "entity" || this.type === "weak_entity") && (L.start.super !== this) ){ // make this shape an end point
                                   
                                  L.end = this;
                                  // console.log("END " + L.end.cx + ", " + L.end.cy);
                                  set_super = 0; 
                                  
                                  connectToSuper();
                                  
                                }
                                
                                
                                 // UNION SUB //
                                 
                               
                                else if ((set_union === 2) && (this.type === "union") ){ // make this shape an end point
                                   
                                  L.end = this;
                                  
                                  set_union = 0;     
                                  
                                  
                                 connectEntityToUnion();
                                
                                    
                                }
                                
                                // REMOVE UNION SUB //
                             
                                
                                else if ((remove_union === 2) && (this.type === "union") ){ 
                                   
                                  L.end = this;                                 
                                  remove_union = 0; 
                                  
                                  var flag = 0; // check if this line already exists
                                  var temp_line = 0;                                 
                                  
                                  
                                  for(i=0; i<L.start.unions.length; i++){
                                      
                                      if(L.start.unions[i].end === this){
                                          
                                          flag = 1;
                                          temp_line = L.start.unions[i];
                                          break;
                                          
                                      }   
                                      
                                     
                                      
                                  }
                                  
                                   
                                 
                                  if(flag === 1){  // if a line between them exists, remove it                    

                                            var indexE = L.start.unions.indexOf(temp_line);  // remove line from entity's list
                                            L.start.unions.splice(indexE,1);                                 
                                           
                                            
                                            if(L.end.unionLine.companion !==0){
                                                
                                                L.end.unionLine.companion.remove();
                                            }
                                            
                                             L.end.sub = 0;    // union does not have a sub anymore
                                             L.end.unionLine = 0;
                                            
                                           temp_line.remove(); // delete line
                                            
                                    
                                }
                                
                             }
                             
                             // UNION SUPER //                             
                                
                                
                                else if ((union_super === 2) && (this.type === "entity" || this.type === "weak_entity") ){ // make this shape an end point
                                   
                                  L.end = this;
                                  // console.log("END " + L.end.cx + ", " + L.end.cy);
                                  union_super = 0; 
                                  
                                  connectUnionToSuper();
                                  
                                  
                                }
                                
                                // REMOVE UNION SUPER //
                                
                                
                                else if ((del_union_super  === 2) && (this.type === "entity" || this.type === "weak_entity") ){ // make this shape an end point
                                   
                                  L.end = this;                                 
                                  del_union_super  = 0; 
                                  
                                  var flag = 0; // check if this line already exists
                                  var temp_line = 0;
                                  
                                  
                                  
                                  for(i=0; i<L.start.supers.length; i++){
                                      
                                      if(L.start.supers[i].end === this){
                                          
                                          flag = 1;
                                          temp_line = L.start.supers[i];
                                          break;
                                          
                                      }   
                                      
                                     
                                      
                                  }                                  
                                   
                                 
                                  if(flag === 1){  // if a line between them exists, remove it                    

                                            var indexE = L.start.supers.indexOf(temp_line);  // remove line from entity's list
                                            L.start.supers.splice(indexE,1);                                  
                                            
                                            
                                            indexE = L.end.union_subs.indexOf(temp_line);  // remove line from specialization's list
                                            L.end.union_subs.splice(indexE,1);
                                            
                                           temp_line.remove(); // delete line
                                            
                                    
                                }
                                
                             }                                
                                 
                                 
                                 
                                 // SPECIALIZATION  //
                                 
                               
                                else if ((set_spec === 2) && (this.type === "disjoint" || this.type === "overlapping") ){ // make this shape an end point
                                   
                                  L.end = this;
                                  // console.log("END " + L.end.cx + ", " + L.end.cy);
                                  set_spec = 0; 
                                  
                                  connectEntityToSpecialization("");
                                
                                    
                                }
                                
                                // REMOVE SPECIALIZATION //
                               
                                
                                else if ((remove_spec === 2) && (this.type === "disjoint" || this.type === "overlapping") ){ // make this shape an end point
                                   
                                  L.end = this;                                 
                                  remove_spec = 0; 
                                  
                                  var flag = 0; // check if this line already exists
                                  var temp_line = 0;
                                  
                                  
                                  
                                  for(i=0; i<L.start.super_specializations.length; i++){
                                      
                                      if(L.start.super_specializations[i].end === this){
                                          
                                          flag = 1;
                                          temp_line = L.start.super_specializations[i];
                                          break;
                                          
                                      }   
                                      
                                     
                                      
                                  }
                                  
                                   
                                 
                                  if(flag === 1){  // if a line between them exists, remove it                    

                                            var indexE = L.start.super_specializations.indexOf(temp_line);  // remove line from entity's list
                                            L.start.super_specializations.splice(indexE,1);                                  
                                            
                                            
                                            indexE = L.end.subs.indexOf(temp_line);  // remove line from specialization's list
                                            L.end.subs.splice(indexE,1);
                                            
                                            if(temp_line.criteria !== ""){
                                                
                                                   
                                                temp_line.criteria = ""; 
                                                temp_line.text.remove();
                                                
                                            }
                                            
                                           temp_line.remove(); // delete line
                                            
                                    
                                }
                                
                             }
                             
                             
                                // SET CRITERIA //
                              
                                
                                else if ((set_criteria === 2) && (this.type === "disjoint" || this.type === "overlapping") ){ // make this shape an end point
                                   
                                  L.end = this;                                 
                                  set_criteria = 0; 
                                  
                                  var flag = 0; // check if this line already exists
                                  
                                  
                                  
                                  for(i=0; i<L.start.super_specializations.length; i++){
                                      
                                      if(L.start.super_specializations[i].end === this){
                                          
                                          flag = 1;
                                         
                                          break;
                                          
                                      }   
                                      
                                     
                                      
                                  }
                                  
                                   
                                 
                                  if(flag === 1){  // if a line between them exists, set criteria 
                                      
                                      var string = prompt("Please enter an attribute value.", "");  // ask for name
                            
                                        if (string == null) {

                                                 string = "";

                                             }

                                        string = string.replace(/ /g,"_");  
                                        
                                      L.start.super_specializations[i].criteria = string;     
                                            
                                    
                                }
                                
                             }
                                
                                
                                
                                // REMOVE CRITERIA //
                             
                                else if ((del_criteria === 2) && (this.type === "disjoint" || this.type === "overlapping") ){ // make this shape an end point
                                   
                                  L.end = this;                                 
                                  del_criteria = 0; 
                                  
                                  var flag = 0; // check if this line already exists
                                 
                                  
                                  for(i=0; i<L.start.super_specializations.length; i++){
                                      
                                      if(L.start.super_specializations[i].end === this){
                                          
                                          flag = 1;
                                         
                                          break;
                                          
                                      }   
                            
                                      
                                  }
                                  
                                  
                                  
                                   
                                 
                                  if(flag === 1){  // if a line between them exists, remove criteria 
                                      
                                        
                                      L.start.super_specializations[i].criteria = "";
                                      //alert(L.start.super_specializations[i].criteria);
                                          
                                    
                                }
                                
                             }
                                    
                                 
                                 // ATTRIBUTE LINES //                                   
                                
                                
                                else if ((line_cr === 2)  && (L.start !== this) && (this.type === "entity" || this.type === "weak_entity" || this.type === "attribute" || this.type === "multi_attribute" || this.type === "relationship" || this.type === "identifying_rel")){ // make this shape an end point
                                   
                                  L.end = this;
                                  // console.log("END " + L.end.cx + ", " + L.end.cy);
                                  line_cr = 0; 
                                  
                                 if(L.end.type === "attribute" || L.end.type === "multi_attribute"){
                                     
                                     if( L.end.owner.type === "attribute" || L.end.owner.type === "multi_attribute"){ return; }
                                     
                                 }
                                  
                                  
                                  
                                  if(L.start.type === "multi_attribute" && L.end.type === "multi_attribute") { return; }
                                  
                                  connectAttrToOwner ();
                                  
                                    
                                }    
                                
                                 // PARTIAL RELATIONSHIP LINES //
                                                          
                                
                                
                                else if ((sConnect === 2 )  && (L.start !== this) && (this.type === "entity" || this.type === "weak_entity" )){ // make this shape an end point
                                  
                                  L.end = this;
                                  // console.log("END " + L.end.cx + ", " + L.end.cy);
                                  sConnect = 0;
                                  
                                  connectRelToEntityPartial();
                               
                                
                                    
                                }                       
                                
                                
                                
                                // TOTAL RELATIONSHIP LINES //
                                 
                                
                                else if ((dConnect === 2 )  && (L.start !== this) && (this.type === "entity" || this.type === "weak_entity" )){ // make this shape an end point
                                  
                                  L.end = this;
                                  // console.log("END " + L.end.cx + ", " + L.end.cy);
                                  dConnect = 0;   
                                  
                                  connectRelToEntityTotal();
                                      
                                  
                                }    
                             
                            
                            };     
                            
                            // ENTITIES //
                            
                            $.contextMenu({
                                selector: '#entity',
                                items: {
                                    
                                  "superclass": {
                                        "name": "Superclass", 
                                        "items": {
                                            "superclass-key1": {"name": "Set",
                                         callback: function(key, opt) {
                                             
                                              if( Snap(this[0]).super !== 0){
                                                        
                                                  var indexE = Snap(this[0]).super.subs.indexOf(Snap(this[0]).superLine);  // remove old owner first
                                                  Snap(this[0]).super.subs.splice(indexE,1);                                                   

                                                  if(Snap(this[0]).superLine.attribute !== ""){

                                                      Snap(this[0]).superLine.text.remove();
                                                      Snap(this[0]).superLine.attribute = "";

                                                  }       

                                                  Snap(this[0]).superLine.remove();
                                                  Snap(this[0]).super = 0;                                             

                                              }                                        

                                         // make this shape a start point                                   
                                          L.start = Snap(this[0]);                                    
                                         // console.log("START " + L.start.cx + ", " + L.start.cy);
                                          set_super = 2;                                            
                                         
                                         }},
                                            "superclass-key2": {"name": "Remove",
                                         callback: function(key, opt) {
                                                                      
                                            if( Snap(this[0]).super !== 0){
                                            
                                                var indexE = Snap(this[0]).super.subs.indexOf(Snap(this[0]).superLine);  // find position of line within owner's attributes list
                                                Snap(this[0]).super.subs.splice(indexE,1);                         // remove element with that position from attributes list                                   
                                                Snap(this[0]).superLine.remove();
                                            
                                            } 

                                            Snap(this[0]).super = 0;
                                            Snap(this[0]).superLine.remove();          
                                        
                                         }                                      
                                         
                                         }
                                            
                                    }
                                },                                     
                                
                                 "specialization": {
                                        "name": "Specialization", 
                                        "items": {
                                            "spec-key1": {"name": "Set",
                                         callback: function(key, opt) {

                                            // make this shape a start point                                   
                                               L.start =  Snap(this[0]);                                    
                                              // console.log("START " + L.start.cx + ", " + L.start.cy);
                                               set_spec = 2;                                                  
                                         
                                         }},
                                            "spec-key2": {"name": "Remove",
                                         callback: function(key, opt) {

                                            L.start =  Snap(this[0]);                                    

                                            remove_spec = 2;    
                                        
                                         }                                      
                                         
                                         }
                                            
                                    }
                                },
                                
                                 "defining_criteria": {
                                        "name": "Defining Criteria", 
                                        "items": {
                                            "crit-key1": {"name": "Set",
                                         callback: function(key, opt) {

                                            
                                            L.start = Snap(this[0]);                                    

                                            set_criteria = 2;                           
                                         
                                         }},
                                            "crit-key2": {"name": "Remove",
                                         callback: function(key, opt) {
                                            
                                              
                                            L.start = Snap(this[0]);                                    

                                            del_criteria = 2; 
                                            
                                           
                                         }                                      
                                         
                                         }
                                            
                                    }
                                },
                                
                                "union": {
                                        "name": "Union", 
                                        "items": {
                                            "union-key1": {"name": "Set (Partial)",
                                         callback: function(key, opt) {
                                        
                                            L.start = Snap(this[0]);                                    

                                            set_union = 2;      
                                            
                                            union_double = 0;
                                         
                                         }},                                     
                                            "union-key2": {"name": "Set (Total) ",
                                         callback: function(key, opt) {
                                             
                                            L.start = Snap(this[0]);                                    

                                            set_union = 2;      
                                            
                                            union_double = 1;
                       
                                         
                                         }},
                                            "union-key3": {"name": "Remove",
                                         callback: function(key, opt) {
                                    

                                            L.start = Snap(this[0]);                                    

                                            remove_union = 2;     
                                    
                                           
                                         }                                      
                                         
                                         }
                                            
                                    }
                                },
                                    
                                  rename: {
                                    name: "Rename",
                                    callback: function(key, opt) {
                                        
                                    var str = prompt("Please enter a name.", "Name");                                 
                                        

                                         str = str.replace(/ /g,"_");
                                         
                                         if (str !== null) {

                                            Snap(this[0]).name = str;  

                                        }                                                         
                                      
                                    }
                                  },
                                  delete: {
                                    name: "Delete",
                                    callback: function(key, opt) {
                                        
                                      for(i=0; i<Snap(this[0]).attributes.length; i++){        // set "owner" of all attributes = 0
                                            
                                                Snap(this[0]).attributes[i].start.owner = 0;  
                                                Snap(this[0]).attributes[i].start.ownerLine = 0; 
                                                Snap(this[0]).attributes[i].remove();                                                                             

                                        }
                                        
                                         for(i=0; i<Snap(this[0]).unions.length; i++){        // set "sub" of all unions = 0
                                            
                                                Snap(this[0]).unions[i].end.sub = 0;  
                                                Snap(this[0]).unions[i].end.unionLine = 0;
                                                  
                                                
                                                 if(Snap(this[0]).unions[i].companion !== 0){    // remove double line, if total participation                                            
                                              
                                                     Snap(this[0]).unions[i].companion.remove(); 
                                                     
                                                }   
                                                
                                                 Snap(this[0]).unions[i].remove(); 

                                        }
                                        
                                         for(i=0; i<Snap(this[0]).subs.length; i++){        // set "super" of all entities = 0
                                            
                                             
                                                Snap(this[0]).subs[i].start.super = 0;
                                                Snap(this[0]).subs[i].start.superLine = 0;  
                                                Snap(this[0]).subs[i].remove();    
                                                
                                                

                                        }
                                        
                                        
                                         for(i=0; i<Snap(this[0]).specializations.length; i++){        // set "super" of all specializations = 0
                                            
                                               
                                                    if(Snap(this[0]).specializations[i].start.superLine.attribute !== ""){

                                                     Snap(this[0]).specializations[i].start.superLine.text.remove();
                                                     Snap(this[0]).specializations[i].start.superLine.attribute = "";

                                                 }
                                                 
                                                 if(Snap(this[0]).specializations[i].start.superLine.companion !== 0){

                                                     Snap(this[0]).specializations[i].start.superLine.companion.remove();
                                                     Snap(this[0]).specializations[i].start.superLine.companion = 0;

                                                 }
                                               
                                                Snap(this[0]).specializations[i].start.super = 0; 
                                                Snap(this[0]).specializations[i].start.superLine = 0;
                                                Snap(this[0]).specializations[i].remove();    
                                                
                                                

                                        }
                                        
                                        for(i=0; i<Snap(this[0]).super_specializations.length; i++){ 
                                            
                                            
                                                   var indexE = Snap(this[0]).super_specializations[i].end.subs.indexOf(Snap(this[0]).super_specializations[i]);  // find position of line within super's subclasses list
                                                   Snap(this[0]).super_specializations[i].end.subs.splice(indexE,1); 
                                                   // remove element with that position from subclasses list    
                                                   if(Snap(this[0]).super_specializations[i].criteria !== ""){
                                                

                                                        Snap(this[0]).super_specializations[i].criteria = ""; 
                                                        Snap(this[0]).super_specializations[i].text.remove();

                                                    }
                                                   
                                                   Snap(this[0]).super_specializations[i].remove();                                                         
                                                   
                                                   

                                        }
                                        
                                        for(i=0; i<Snap(this[0]).union_subs.length; i++){        
                                            
                                                   var indexE = Snap(this[0]).union_subs[i].start.supers.indexOf(Snap(this[0]).union_subs[i]);  // find position of line within super's subclasses list
                                                   Snap(this[0]).union_subs[i].start.supers.splice(indexE,1);                                    // remove element with that position from subclasses list                                   
                                                   Snap(this[0]).union_subs[i].remove();                                                         

                                        }
                                        
                                        if( Snap(this[0]).super !== 0){
                                            
                                            var indexE = Snap(this[0]).super.subs.indexOf(Snap(this[0]).superLine);  // find position of line within super's subclasses list
                                            Snap(this[0]).super.subs.splice(indexE,1);                                 // remove element with that position from subclasses list                                   
                                            Snap(this[0]).superLine.remove();
                                            
                                        }   
                                        
                                        for(i=0; i<Snap(this[0]).relationships.length; i++){ 
                                            
                                                if(Snap(this[0]).relationships[i].start.topEntity === Snap(this[0])){

                                                        Snap(this[0]).relationships[i].start.topLine = 0;         
                                                        Snap(this[0]).relationships[i].start.topEntity = 0; 


                                                    }
                                                    
                                                   if(Snap(this[0]).relationships[i].start.botEntity === Snap(this[0])){
                                                    
                                                    Snap(this[0]).relationships[i].start.botLine = 0;         
                                                   Snap(this[0]).relationships[i].start.botEntity = 0; 
                                                                                     
                                                    
                                                }
                                            
                                            
                                                if(Snap(this[0]).relationships[i].start.leftEntity === Snap(this[0])){
                                                    
                                                    Snap(this[0]).relationships[i].start.leftLine = 0;         
                                                    Snap(this[0]).relationships[i].start.leftEntity = 0; 
                                                                                     
                                                    
                                                }
                                                
                                                if(Snap(this[0]).relationships[i].start.rightEntity === Snap(this[0])){
                                                    
                                                    Snap(this[0]).relationships[i].start.rightLine = 0;        
                                                    Snap(this[0]).relationships[i].start.rightEntity = 0; 
                                                                                     
                                                    
                                                }
                                                
                                                if(Snap(this[0]).relationships[i].companion !== 0){    // remove double line, if total particilation                                            
                                              
                                                     Snap(this[0]).relationships[i].companion.remove(); 
                                                     
                                                }    
                                                
                                                Snap(this[0]).relationships[i].text.remove();
                                                Snap(this[0]).relationships[i].remove();                                                           

                                        } 
                                        
                                        
                                        
                                        Snap(this[0]).text.remove();                             // remove name
                                        
                                        var indexS = globalEntities.indexOf(Snap(this[0]));  // remove from global list
                                        
                                        globalEntities.splice(indexS,1);
                                        
                                        
                                        Snap(this[0]).remove();                                // remove target  
                                        
                                        
                                        
                                      
                                    }
                                  }
                                }                 
                                
                              });
                              
                              // WEAK ENTITIES
                              
                               $.contextMenu({
                                selector: '#weak_entity',
                                items: {                                                            
                                                                    
                                  rename: {
                                    name: "Rename",
                                    callback: function(key, opt) {
                                        
                                    var str = prompt("Please enter a name.", "Name");                                 
                                        

                                         str = str.replace(/ /g,"_");
                                         
                                         if (str !== null) {

                                            Snap(this[0]).name = str;  

                                        }                                                         
                                      
                                    }
                                  },
                                  delete: {
                                    name: "Delete",
                                    callback: function(key, opt) {
                                        
                                      for(i=0; i<Snap(this[0]).attributes.length; i++){        // set "owner" of all attributes = 0
                                            
                                                Snap(this[0]).attributes[i].start.owner = 0;  
                                                Snap(this[0]).attributes[i].start.ownerLine = 0; 
                                                Snap(this[0]).attributes[i].remove();                                                                             

                                        }
                                        
                                       
                                        for(i=0; i<Snap(this[0]).relationships.length; i++){ 
                                            
                                                if(Snap(this[0]).relationships[i].start.topEntity === Snap(this[0])){

                                                        Snap(this[0]).relationships[i].start.topLine = 0;         
                                                        Snap(this[0]).relationships[i].start.topEntity = 0; 


                                                    }
                                                    
                                                   if(Snap(this[0]).relationships[i].start.botEntity === Snap(this[0])){
                                                    
                                                    Snap(this[0]).relationships[i].start.botLine = 0;         
                                                   Snap(this[0]).relationships[i].start.botEntity = 0; 
                                                                                     
                                                    
                                                }
                                            
                                            
                                                if(Snap(this[0]).relationships[i].start.leftEntity === Snap(this[0])){
                                                    
                                                    Snap(this[0]).relationships[i].start.leftLine = 0;         
                                                    Snap(this[0]).relationships[i].start.leftEntity = 0; 
                                                                                     
                                                    
                                                }
                                                
                                                if(Snap(this[0]).relationships[i].start.rightEntity === Snap(this[0])){
                                                    
                                                    Snap(this[0]).relationships[i].start.rightLine = 0;        
                                                    Snap(this[0]).relationships[i].start.rightEntity = 0; 
                                                                                     
                                                    
                                                }
                                                
                                                if(Snap(this[0]).relationships[i].companion !== 0){    // remove double line, if total particilation                                            
                                              
                                                     Snap(this[0]).relationships[i].companion.remove(); 
                                                     
                                                }    
                                                
                                                Snap(this[0]).relationships[i].text.remove();
                                                Snap(this[0]).relationships[i].remove();                                                           

                                        } 
                                        
                                        
                                        
                                        Snap(this[0]).text.remove();                             // remove name
                                        
                                        var indexS = globalEntities.indexOf(Snap(this[0]));  // remove from global list
                                        
                                        globalEntities.splice(indexS,1);
                                        
                                        
                                        Snap(this[0]).remove();                                // remove target  
                                        
                                        
                                        
                                      
                                    }
                                  }
                                }                 
                                
                              });
                              
                              // RELATIONSHIPS //                             
                            
                              
                              $.contextMenu({
                                selector: '#relationship',
                                items: {
                                    
                                  "top": {
                                        "name": "Top", 
                                        "items": {
                                            "top-key1": {"name": "Set (Partial)",
                                         callback: function(key, opt) {
                                             
                                              if( Snap(this[0]).topLine !== 0){
                                            
                                            var indexE = Snap(this[0]).topEntity.relationships.indexOf(Snap(this[0]).topLine);  // remove old connection first
                                            Snap(this[0]).topEntity.attributes.splice(indexE, 1);  
                                            
                                            if(Snap(this[0]).topLine.companion !== 0){                                             
                                              
                                                Snap(this[0]).topLine.companion.remove();                                             
                                            }   
                                            
                                            Snap(this[0]).topLine.text.remove();
                                            Snap(this[0]).topLine.remove();
                                            Snap(this[0]).topEntity = 0;                                            
                                            
                                        }
                                        
                                                                           
                                 
                                              // make this shape a start point                                   
                                               L.start = Snap(this[0]);                                    
                                              // console.log("START " + L.start.cx + ", " + L.start.cy);
                                               sConnect = 2;      
                                               edge = 1;
                                                                 
                                         
                                         }},
                                            "top-key2": {"name": "Set (Total)",
                                         callback: function(key, opt) {
                                             
                                               
                                              if( Snap(this[0]).topLine !== 0){
                                            
                                            var indexE = Snap(this[0]).topEntity.relationships.indexOf(Snap(this[0]).topLine);  // remove old connection first
                                            Snap(this[0]).topEntity.attributes.splice(indexE,1);  
                                            
                                            if(Snap(this[0]).topLine.companion !== 0){                                             
                                              
                                                Snap(this[0]).topLine.companion.remove();                                             
                                            }   
                                            
                                            Snap(this[0]).topLine.text.remove();
                                            Snap(this[0]).topLine.remove();
                                            Snap(this[0]).topEntity = 0;                                            
                                            
                                        }
                                        
                                                                           
                                 
                                              // make this shape a start point                                   
                                               L.start = Snap(this[0]);                                    
                                              // console.log("START " + L.start.cx + ", " + L.start.cy);
                                               dConnect = 2;      
                                               edge = 1;
                                                                 
                                           
                                    
                                            
                                         }                                      
                                         
                                         },
                                         
                                         "top-key3": {"name": "Remove",
                                         callback: function(key, opt) {
                                             
                                            var indexE = Snap(this[0]).topEntity.relationships.indexOf(Snap(this[0]).topLine);  // remove old connection first
                                            Snap(this[0]).topEntity.attributes.splice(indexE,1);  
                                            
                                            if(Snap(this[0]).topLine.companion !== 0){                                             
                                              
                                                Snap(this[0]).topLine.companion.remove();                                             
                                            }   
                                            
                                            Snap(this[0]).topLine.text.remove();
                                            Snap(this[0]).topLine.remove();
                                            Snap(this[0]).topLine = 0;
                                            Snap(this[0]).topEntity = 0;                                            
                                    
                                            
                                         }                                      
                                         
                                         },
                                         
                                         "top-key4": {"name": "Ratio: 1",
                                         callback: function(key, opt) {
                                             
                                            if( Snap(this[0]).topLine !== 0){

                                               Snap(this[0]).topLine.ratio = "1";                                                                               

                                           }                  
                                    
                                            
                                         }                                      
                                         
                                         },
                                         
                                         "top-key5": {"name": "Ratio: N",
                                         callback: function(key, opt) {
                                             
                                             if( Snap(this[0]).topLine !== 0){

                                               Snap(this[0]).topLine.ratio = "N";                                                                               

                                           }                                                                      
                                    
                                            
                                         }                                      
                                         
                                         },
                                         
                                         
                                         "top-key6": {"name": "Ratio: M",
                                         callback: function(key, opt) {
                                             
                                             if( Snap(this[0]).topLine !== 0){

                                               Snap(this[0]).topLine.ratio = "M";                                                                               

                                           }                                                                      
                                    
                                            
                                         }                                      
                                         
                                         },
                                         
                                         "top-key7": {"name": "Ratio: L",
                                         callback: function(key, opt) {
                                             
                                             if( Snap(this[0]).topLine !== 0){

                                               Snap(this[0]).topLine.ratio = "L";                                                                               

                                           }                                                                      
                                    
                                            
                                         }                                      
                                         
                                         },
                                         
                                         "top-key8": {"name": "Ratio: K",
                                         callback: function(key, opt) {
                                             
                                             if( Snap(this[0]).topLine !== 0){

                                               Snap(this[0]).topLine.ratio = "K";                                                                               

                                           }                                                                      
                                    
                                            
                                         }                                      
                                         
                                         }
                                            
                                    }
                                },    
                                
                                "bottom": {
                                        "name": "Bottom", 
                                        "items": {
                                            "bot-key1": {"name": "Set (Partial)",
                                         callback: function(key, opt) {
                                             
                                              if( Snap(this[0]).botLine !== 0){
                                            
                                            var indexE = Snap(this[0]).botEntity.relationships.indexOf(Snap(this[0]).botLine);  // remove old connection first
                                            Snap(this[0]).botEntity.attributes.splice(indexE,1);  
                                            
                                            if(Snap(this[0]).botLine.companion !== 0){                                             
                                              
                                                Snap(this[0]).botLine.companion.remove();                                             
                                            }   
                                            
                                            Snap(this[0]).botLine.text.remove();
                                            Snap(this[0]).botLine.remove();
                                            Snap(this[0]).botLine = 0;
                                            Snap(this[0]).botEntity = 0;                                            
                                            
                                        }                           
                                 
                                              // make this shape a start point                                   
                                               L.start = Snap(this[0]);                                    
                                              // console.log("START " + L.start.cx + ", " + L.start.cy);
                                               sConnect = 2;      
                                               edge = 2;
                                                                 
                                         
                                         }},
                                            "bot-key2": {"name": "Set (Total)",
                                         callback: function(key, opt) {
                                             
                                               
                                              if( Snap(this[0]).botLine !== 0){
                                            
                                            var indexE = Snap(this[0]).botEntity.relationships.indexOf(Snap(this[0]).botLine);  // remove old connection first
                                            Snap(this[0]).botEntity.attributes.splice(indexE,1);  
                                            
                                            if(Snap(this[0]).botLine.companion !== 0){                                             
                                              
                                                Snap(this[0]).botLine.companion.remove();                                             
                                            }   
                                            
                                            Snap(this[0]).botLine.text.remove();
                                            Snap(this[0]).botLine.remove();
                                            Snap(this[0]).botLine = 0;
                                            Snap(this[0]).botEntity = 0;                                            
                                            
                                        }
                                        
                                                                           
                                 
                                              // make this shape a start point                                   
                                               L.start = Snap(this[0]);                                    
                                              // console.log("START " + L.start.cx + ", " + L.start.cy);
                                               dConnect = 2;      
                                               edge = 2;
                                           
                                         }                                      
                                         
                                         },
                                         
                                         "bot-key3": {"name": "Remove",
                                         callback: function(key, opt) {
                                             
                                            var indexE = Snap(this[0]).botEntity.relationships.indexOf(Snap(this[0]).botLine);  // remove old connection first
                                            Snap(this[0]).botEntity.attributes.splice(indexE,1);  
                                            
                                            if(Snap(this[0]).botLine.companion !== 0){                                             
                                              
                                                Snap(this[0]).botLine.companion.remove();                                             
                                            }   
                                            
                                            Snap(this[0]).botLine.text.remove();
                                            Snap(this[0]).botLine.remove();
                                            Snap(this[0]).botLine = 0;
                                            Snap(this[0]).botEntity = 0;                                            
                                    
                                            
                                         }                                      
                                         
                                         },
                                         
                                         "bot-key4": {"name": "Ratio: 1",
                                         callback: function(key, opt) {
                                             
                                            if( Snap(this[0]).botLine !== 0){

                                               Snap(this[0]).botLine.ratio = "1";                                                                               

                                           }                  
                                    
                                            
                                         }                                      
                                         
                                         },
                                         
                                         "bot-key5": {"name": "Ratio: N",
                                         callback: function(key, opt) {
                                             
                                             if( Snap(this[0]).botLine !== 0){

                                               Snap(this[0]).botLine.ratio = "N";                                                                               

                                           }                                                                      
                                    
                                            
                                         }                                      
                                         
                                         },
                                         
                                         
                                         "bot-key6": {"name": "Ratio: M",
                                         callback: function(key, opt) {
                                             
                                             if( Snap(this[0]).botLine !== 0){

                                               Snap(this[0]).botLine.ratio = "M";                                                                               

                                           }                                                                      
                                    
                                            
                                         }                                      
                                         
                                         },
                                         
                                         "bot-key7": {"name": "Ratio: L",
                                         callback: function(key, opt) {
                                             
                                             if( Snap(this[0]).botLine !== 0){

                                               Snap(this[0]).botLine.ratio = "L";                                                                               

                                           }                                                                      
                                    
                                            
                                         }                                      
                                         
                                         },
                                         
                                         "bot-key8": {"name": "Ratio: K",
                                         callback: function(key, opt) {
                                             
                                             if( Snap(this[0]).botLine !== 0){

                                               Snap(this[0]).botLine.ratio = "K";                                                                               

                                           }                                                                      
                                    
                                            
                                         }                                      
                                         
                                         }
                                         
                                        
                                            
                                    }
                                },
                                
                                "left": {
                                        "name": "Left", 
                                        "items": {
                                            "left-key1": {"name": "Set (Partial)",
                                         callback: function(key, opt) {
                                             
                                              if( Snap(this[0]).leftLine !== 0){
                                            
                                            var indexE = Snap(this[0]).leftEntity.relationships.indexOf(Snap(this[0]).leftLine);  // remove old connection first
                                            Snap(this[0]).leftEntity.attributes.splice(indexE,1);  
                                            
                                            if(Snap(this[0]).leftLine.companion !== 0){                                             
                                              
                                                Snap(this[0]).leftLine.companion.remove();                                             
                                            }   
                                            
                                            Snap(this[0]).leftLine.text.remove();
                                            Snap(this[0]).leftLine.remove();
                                            Snap(this[0]).leftLine = 0;
                                            Snap(this[0]).leftEntity = 0;                                            
                                            
                                        }                           
                                 
                                              // make this shape a start point                                   
                                               L.start = Snap(this[0]);                                    
                                              // console.log("START " + L.start.cx + ", " + L.start.cy);
                                               sConnect = 2;      
                                               edge = 3;
                                                                 
                                         
                                         }},
                                            "left-key2": {"name": "Set (Total)",
                                         callback: function(key, opt) {
                                             
                                               
                                              if( Snap(this[0]).leftLine !== 0){
                                            
                                            var indexE = Snap(this[0]).leftEntity.relationships.indexOf(Snap(this[0]).leftLine);  // remove old connection first
                                            Snap(this[0]).leftEntity.attributes.splice(indexE,1);  
                                            
                                            if(Snap(this[0]).leftLine.companion !== 0){                                             
                                              
                                                Snap(this[0]).leftLine.companion.remove();                                             
                                            }   
                                            
                                            Snap(this[0]).leftLine.text.remove();
                                            Snap(this[0]).leftLine.remove();
                                            Snap(this[0]).leftLine = 0;
                                            Snap(this[0]).leftEntity = 0;                                            
                                            
                                        }
                                        
                                                                           
                                 
                                              // make this shape a start point                                   
                                               L.start = Snap(this[0]);                                    
                                              // console.log("START " + L.start.cx + ", " + L.start.cy);
                                               dConnect = 2;      
                                               edge = 3;
                                           
                                         }                                      
                                         
                                         },
                                         
                                         "left-key3": {"name": "Remove",
                                         callback: function(key, opt) {
                                             
                                            var indexE = Snap(this[0]).leftEntity.relationships.indexOf(Snap(this[0]).leftLine);  // remove old connection first
                                            Snap(this[0]).leftEntity.attributes.splice(indexE,1);  
                                            
                                            if(Snap(this[0]).leftLine.companion !== 0){                                             
                                              
                                                Snap(this[0]).leftLine.companion.remove();                                             
                                            }   
                                            
                                            Snap(this[0]).leftLine.text.remove();
                                            Snap(this[0]).leftLine.remove();
                                            Snap(this[0]).leftLine = 0;
                                            Snap(this[0]).leftEntity = 0;                                            
                                    
                                            
                                         }                                      
                                         
                                         },
                                         
                                         "left-key4": {"name": "Ratio: 1",
                                         callback: function(key, opt) {
                                             
                                            if( Snap(this[0]).leftLine !== 0){

                                               Snap(this[0]).leftLine.ratio = "1";                                                                               

                                           }                  
                                    
                                            
                                         }                                      
                                         
                                         },
                                         
                                         "left-key5": {"name": "Ratio: N",
                                         callback: function(key, opt) {
                                             
                                             if( Snap(this[0]).leftLine !== 0){

                                               Snap(this[0]).leftLine.ratio = "N";                                                                               

                                           }                                                                      
                                    
                                            
                                         }                                      
                                         
                                         },
                                         
                                         
                                         "left-key6": {"name": "Ratio: M",
                                         callback: function(key, opt) {
                                             
                                             if( Snap(this[0]).leftLine !== 0){

                                               Snap(this[0]).leftLine.ratio = "M";                                                                               

                                           }                                                                      
                                    
                                            
                                         }                                      
                                         
                                         },
                                         
                                         "left-key7": {"name": "Ratio: L",
                                         callback: function(key, opt) {
                                             
                                             if( Snap(this[0]).leftLine !== 0){

                                               Snap(this[0]).leftLine.ratio = "L";                                                                               

                                           }                                                                      
                                    
                                            
                                         }                                      
                                         
                                         },
                                         
                                         "left-key8": {"name": "Ratio: K",
                                         callback: function(key, opt) {
                                             
                                             if( Snap(this[0]).leftLine !== 0){

                                               Snap(this[0]).leftLine.ratio = "K";                                                                               

                                           }                                                                      
                                    
                                            
                                         }                                      
                                         
                                         }
                                         
                                         
                                            
                                    }
                                },
                                
                                 "right": {
                                        "name": "Right", 
                                        "items": {
                                            "right-key1": {"name": "Set (Partial)",
                                         callback: function(key, opt) {
                                             
                                              if( Snap(this[0]).rightLine !== 0){
                                            
                                            var indexE = Snap(this[0]).rightEntity.relationships.indexOf(Snap(this[0]).rightLine);  // remove old connection first
                                            Snap(this[0]).rightEntity.attributes.splice(indexE,1);  
                                            
                                            if(Snap(this[0]).rightLine.companion !== 0){                                             
                                              
                                                Snap(this[0]).rightLine.companion.remove();                                             
                                            }   
                                            
                                            Snap(this[0]).rightLine.text.remove();
                                            Snap(this[0]).rightLine.remove();
                                            Snap(this[0]).rightLine = 0;
                                            Snap(this[0]).rightEntity = 0;                                            
                                            
                                        }                           
                                 
                                              // make this shape a start point                                   
                                               L.start = Snap(this[0]);                                    
                                              // console.log("START " + L.start.cx + ", " + L.start.cy);
                                               sConnect = 2;      
                                               edge = 4;
                                                                 
                                         
                                         }},
                                            "right-key2": {"name": "Set (Total)",
                                         callback: function(key, opt) {
                                             
                                               
                                              if( Snap(this[0]).rightLine !== 0){
                                            
                                            var indexE = Snap(this[0]).rightEntity.relationships.indexOf(Snap(this[0]).rightLine);  // remove old connection first
                                            Snap(this[0]).rightEntity.attributes.splice(indexE,1);  
                                            
                                            if(Snap(this[0]).rightLine.companion !== 0){                                             
                                              
                                                Snap(this[0]).rightLine.companion.remove();                                             
                                            }   
                                            
                                            Snap(this[0]).rightLine.text.remove();
                                            Snap(this[0]).rightLine.remove();
                                            Snap(this[0]).rightLine = 0;
                                            Snap(this[0]).rightEntity = 0;                                            
                                            
                                        }
                                        
                                                                           
                                 
                                              // make this shape a start point                                   
                                               L.start = Snap(this[0]);                                    
                                              // console.log("START " + L.start.cx + ", " + L.start.cy);
                                               dConnect = 2;      
                                               edge = 4;
                                           
                                         }                                      
                                         
                                         },
                                         
                                         "right-key3": {"name": "Remove",
                                         callback: function(key, opt) {
                                             
                                            var indexE = Snap(this[0]).rightEntity.relationships.indexOf(Snap(this[0]).rightLine);  // remove old connection first
                                            Snap(this[0]).rightEntity.attributes.splice(indexE,1);  
                                            
                                            if(Snap(this[0]).rightLine.companion !== 0){                                             
                                              
                                                Snap(this[0]).rightLine.companion.remove();                                             
                                            }   
                                            
                                            Snap(this[0]).rightLine.text.remove();
                                            Snap(this[0]).rightLine.remove();
                                            Snap(this[0]).rightLine = 0;
                                            Snap(this[0]).rightEntity = 0;                                            
                                    
                                            
                                         }                                      
                                         
                                         },
                                         
                                         "right-key4": {"name": "Ratio: 1",
                                         callback: function(key, opt) {
                                             
                                            if( Snap(this[0]).rightLine !== 0){

                                               Snap(this[0]).rightLine.ratio = "1";                                                                               

                                           }                  
                                    
                                            
                                         }                                      
                                         
                                         },
                                         
                                         "right-key5": {"name": "Ratio: N",
                                         callback: function(key, opt) {
                                             
                                             if( Snap(this[0]).rightLine !== 0){

                                               Snap(this[0]).rightLine.ratio = "N";                                                                               

                                           }                                                                      
                                    
                                            
                                         }                                      
                                         
                                         },
                                         
                                         "right-key6": {"name": "Ratio: M",
                                         callback: function(key, opt) {
                                             
                                             if( Snap(this[0]).rightLine !== 0){

                                               Snap(this[0]).rightLine.ratio = "M";                                                                               

                                           }                                                                      
                                    
                                            
                                         }                                      
                                         
                                         },
                                         
                                         "right-key7": {"name": "Ratio: L",
                                         callback: function(key, opt) {
                                             
                                             if( Snap(this[0]).rightLine !== 0){

                                               Snap(this[0]).rightLine.ratio = "L";                                                                               

                                           }                                                                      
                                    
                                            
                                         }                                      
                                         
                                         },
                                         
                                         "right-key8": {"name": "Ratio: K",
                                         callback: function(key, opt) {
                                             
                                             if( Snap(this[0]).rightLine !== 0){

                                               Snap(this[0]).rightLine.ratio = "K";                                                                               

                                           }                                                                      
                                    
                                            
                                         }                                      
                                         
                                         }
                                            
                                    }
                                },
                                
                                rename: {
                                    name: "Rename",
                                    callback: function(key, opt) {                                      
                                        
                                        
                                    var str = prompt("Please enter a name.", "Name"); 
                                 
                                        
                                         str = str.replace(/ /g,"_");
                                         
                                         if (str !== null) {

                                            Snap(this[0]).name = str;  

                                        }                                               
                                      
                                    }
                                  },
                               
                                  delete: {
                                    name: "Delete",
                                    callback: function(key, opt) {
                                        
                                        for(i=0; i<Snap(this[0]).attributes.length; i++){        // set "owner" of all attributes = 0
                                            
                                                Snap(this[0]).attributes[i].start.owner = 0;         // start point of the line will always be the child
                                                Snap(this[0]).attributes[i].remove();                // remove line                                                               

                                        }  
                                        
                                        if( Snap(this[0]).topEntity !== 0){
                                            
                                            var indexE = Snap(this[0]).topEntity.relationships.indexOf(Snap(this[0]).topLine);  // find position of line within owner's relationships list
                                            Snap(this[0]).topEntity.relationships.splice(indexE,1);                         // remove element with that position from relationships list                                   
                                            
                                         if(Snap(this[0]).topLine.companion !== 0){                                             
                                              
                                                Snap(this[0]).topLine.companion.remove();                                             
                                         }          
                                         
                                         
                                            Snap(this[0]).topLine.text.remove();
                                            Snap(this[0]).topLine.remove();
                                            
                                        }  
                                        
                                        if( Snap(this[0]).botEntity !== 0){
                                            
                                            var indexE = Snap(this[0]).botEntity.relationships.indexOf(Snap(this[0]).botLine);  // find position of line within owner's relationships list
                                            Snap(this[0]).botEntity.relationships.splice(indexE,1);                         // remove element with that position from relationships list                                   
                                            
                                         if(Snap(this[0]).botLine.companion !== 0){                                             
                                              
                                                Snap(this[0]).botLine.companion.remove();                                             
                                         }        
                                         
                                            Snap(this[0]).botLine.text.remove();
                                            Snap(this[0]).botLine.remove();
                                            
                                        }        
                                        
                                        if( Snap(this[0]).leftEntity !== 0){
                                            
                                            var indexE = Snap(this[0]).leftEntity.relationships.indexOf(Snap(this[0]).leftLine);  // find position of line within owner's relationships list
                                            Snap(this[0]).leftEntity.relationships.splice(indexE,1);                         // remove element with that position from relationships list                                   
                                            
                                         if(Snap(this[0]).leftLine.companion !== 0){                                             
                                              
                                                Snap(this[0]).leftLine.companion.remove();
                                             
                                         }
                                        
                                            Snap(this[0]).leftLine.text.remove();
                                            Snap(this[0]).leftLine.remove();
                                            
                                        }    
                                        
                                        if( Snap(this[0]).rightEntity !== 0){
                                            
                                            var indexE = Snap(this[0]).rightEntity.relationships.indexOf(Snap(this[0]).rightLine);  // find position of line within owner's relationships list
                                            Snap(this[0]).rightEntity.relationships.splice(indexE,1);                         // remove element with that position from relationships list                                   
                                            
                                         if(Snap(this[0]).rightLine.companion !== 0){                                             
                                              
                                                Snap(this[0]).rightLine.companion.remove();                                             
                                         }      
                                         
                                            Snap(this[0]).rightLine.text.remove();
                                            Snap(this[0]).rightLine.remove();
                                            
                                        } 
                                        
                                       
                                        Snap(this[0]).text.remove;                             // remove name
                                        
                                        var indexS = globalRelationships.indexOf(Snap(this[0]));  // remove from global list
                                        globalRelationships.splice(indexS,1);
                                        
                                        Snap(this[0]).remove();                                // remove target  
                                        
                                       
                                        
                                      
                                    }
                                  }
                                }                 
                                
                              });
                              
                             
                             
                              // UNIONS //
                              
                              $.contextMenu({
                                selector: '#union',
                                items: {
                                    
                                  "superclass": {
                                        "name": "Superclass", 
                                        "items": {
                                            "superclass-key1": {"name": "Add",
                                         callback: function(key, opt) {
                                      
                                            // make this shape a start point                                   
                                               L.start =  Snap(this[0]);                                    
                                              // console.log("START " + L.start.cx + ", " + L.start.cy);
                                               union_super = 2;   
                                                                                      
                                         
                                         }},
                                            "superclass-key2": {"name": "Remove",
                                         callback: function(key, opt) {
                                             
                                                                              
                                            L.start = Snap(this[0]);                                    

                                            del_union_super  = 2;     
                                    
                                            
                                         }                                      
                                         
                                         }
                                            
                                    }
                                },                                     
                                
                               
                                  delete: {
                                    name: "Delete",
                                    callback: function(key, opt) {
                                        
                                         if(Snap(this[0]).sub !== 0){
                                         
                                         var indexE = Snap(this[0]).sub.unions.indexOf(Snap(this[0]).unionLine);  // find position of line within super's subclasses list
                                         Snap(this[0]).sub.unions.splice(indexE,1);                         // remove element with that position from specializations list                                   
                                             
                                            if(Snap(this[0]).unionLine.companion !== 0){                                             
                                              
                                                Snap(this[0]).unionLine.companion.remove();                                             
                                            }   
                                         
                                            Snap(this[0]).unionLine.remove();                      
                                         
                                     }
                                     
                                     for(i=0; i<Snap(this[0]).supers.length; i++){        
                                            
                                                   var indexE = Snap(this[0]).supers[i].end.union_subs.indexOf(Snap(this[0]).supers[i]);  // find position of line within super's subclasses list
                                                   Snap(this[0]).supers[i].end.union_subs.splice(indexE,1);                         // remove element with that position from subclasses list                                   
                                                   Snap(this[0]).supers[i].remove();                                                         

                                        }
                                      
                                      Snap(this[0]).text.remove();                             // remove name
                                      
                                      
                                      var indexS = globalSpecs_Unions.indexOf(Snap(this[0]));  // remove from global list
                                      globalSpecs_Unions.splice(indexS,1);
                                      
                                      Snap(this[0]).remove();                                // remove target
                                      
                                    }
                                  }
                                }                 
                                
                              });
                              
                              // SPECIALIZATIONS // 
                              
                              $.contextMenu({
                                selector: '#spec',
                                items: {
                                    
                                  "superclass": {
                                        "name": "Superclass", 
                                        "items": {
                                            "superclass-key1": {"name": "Set (Partial)",
                                         callback: function(key, opt) {
                                             
                                             if(  Snap(this[0]).super !== 0){
                                                             

                                                var indexE =  Snap(this[0]).super.specializations.indexOf( Snap(this[0]).superLine);  // remove old owner first
                                                 Snap(this[0]).super.specializations.splice(indexE,1);  

                                                if( Snap(this[0]).superLine.companion !== 0){                                             

                                                     Snap(this[0]).superLine.companion.remove();                                             
                                                }   


                                                if( Snap(this[0]).superLine.attribute !== ""){

                                                     Snap(this[0]).superLine.text.remove();
                                                     Snap(this[0]).superLine.attribute = "";

                                                }       

                                                 Snap(this[0]).superLine.remove();
                                                 Snap(this[0]).super = 0;                                             
                                            
                                        }                                        

                                           // make this shape a start point                                   
                                           L.start =  Snap(this[0]);                                    
                                          // console.log("START " + L.start.cx + ", " + L.start.cy);
                                           set_super = 2;  
                                           super_double = 0;
                                                          
                                         
                                         }},
                                     
                                        "superclass-key2": {"name": "Set (Total)",
                                         callback: function(key, opt) {
                                             
                                             if(  Snap(this[0]).super !== 0){
                                                             

                                                var indexE =  Snap(this[0]).super.specializations.indexOf( Snap(this[0]).superLine);  // remove old owner first
                                                 Snap(this[0]).super.specializations.splice(indexE,1);  

                                                if( Snap(this[0]).superLine.companion !== 0){                                             

                                                     Snap(this[0]).superLine.companion.remove();                                             
                                                }   


                                                if( Snap(this[0]).superLine.attribute !== ""){

                                                     Snap(this[0]).superLine.text.remove();
                                                     Snap(this[0]).superLine.attribute = "";

                                                }       

                                                 Snap(this[0]).superLine.remove();
                                                 Snap(this[0]).super = 0;                                             
                                            
                                        }                                        

                                           // make this shape a start point                                   
                                           L.start =  Snap(this[0]);                                    
                                          // console.log("START " + L.start.cx + ", " + L.start.cy);
                                           set_super = 2;  
                                           super_double = 1;
                                                          
                                         
                                         }},
                                            "superclass-key3": {"name": "Remove",
                                         callback: function(key, opt) {
                                             
                                             if( Snap(this[0]).super !== 0){
                                            
                                            var indexE = Snap(this[0]).super.specializations.indexOf(Snap(this[0]).superLine);  // find position of line within owner's attributes list
                                            Snap(this[0]).super.specializations.splice(indexE,1);                         // remove element with that position from attributes list                                   
                                            
                                             if(Snap(this[0]).superLine.companion !== 0){                                             
                                              
                                                Snap(this[0]).superLine.companion.remove();                                             
                                            }   
                                         
                                           if(Snap(this[0]).superLine.attribute !== ""){
                                                
                                                Snap(this[0]).superLine.text.remove();
                                                Snap(this[0]).superLine.attribute = "";
                                                
                                            }
                                         
                                            Snap(this[0]).superLine.remove();
                                            
                                        } 
                                        
                                        Snap(this[0]).super = 0;
                                        Snap(this[0]).superLine.remove();         
                                             
                                  
                                            
                                         }                                      
                                         
                                         }
                                            
                                    }
                                }, 
                                
                                "defattr": {
                                        "name": "Defining Attribute", 
                                        "items": {
                                            "defattr-key1": {"name": "Set",
                                         callback: function(key, opt) {
                                             
                                             var attr_list = [];
                                             var temp = " ";
                                            
                                            
                                            if(Snap(this[0]).super !== 0){
                                                
                                                
                                         
                                                attr_list = Snap(this[0]).super.attributes;

                                                for(i=0; i<Snap(this[0]).super.attributes.length; i++){    // get each one of the attributes
                                                    
                                                    
                                                   temp = temp + "  " + '"' + Snap(this[0]).super.attributes[i].start.name + '"'; 


                                                }

                                                var string = prompt("Please enter one of the following attributes:" + temp, "");  // ask for attribute
                                                string = string.replace(/ /g,"_");

                                                  

                                                if(string !== null){

                                                    Snap(this[0]).superLine.attribute = string;

                                                }
                                         
                                        }
                                                
                                         
                                         }},
                                     
                                        "defattr-key2": {"name": "Remove",
                                         callback: function(key, opt) {
                                             
                                             
                                             
                                             if(Snap(this[0]).superLine.attribute !== ""){
                                                
                                                Snap(this[0]).superLine.attribute = "";
                                                
                                                
                                            }
                                            
                                            
                                         }}
                                         
                                    }
                                },
                                
                               
                                  delete: {
                                    name: "Delete",
                                    callback: function(key, opt) {
                                        
                                                if( Snap(this[0]).super !== 0){
                                            
                                            var indexE = Snap(this[0]).super.specializations.indexOf(Snap(this[0]).superLine);  // find position of line within super's subclasses list
                                            Snap(this[0]).super.specializations.splice(indexE,1);                         // remove element with that position from specializations list                                   
                                             
                                            if(Snap(this[0]).superLine.companion !== 0){                                             
                                              
                                                Snap(this[0]).superLine.companion.remove();                                             
                                            } 
                                            
                                            if(Snap(this[0]).superLine.attribute !== ""){
                                                
                                                Snap(this[0]).superLine.text.remove();
                                                Snap(this[0]).superLine.attribute = "";
                                                
                                            }    
                                         
                                            Snap(this[0]).superLine.remove();
                                            
                                            
                                        }   
                                        
                                        for(i=0; i<Snap(this[0]).subs.length; i++){        
                                            
                                                   var indexE = Snap(this[0]).subs[i].start.super_specializations.indexOf(Snap(this[0]).subs[i]);  // find position of line within super's subclasses list
                                                   Snap(this[0]).subs[i].start.super_specializations.splice(indexE,1);                         // remove element with that position from subclasses list                                   
                                                   
                                                   if(Snap(this[0]).subs[i].criteria !== ""){
                                                

                                                        Snap(this[0]).subs[i].criteria = ""; 
                                                        Snap(this[0]).subs[i].text.remove();

                                                    }
                                         
                                         
                                                    Snap(this[0]).subs[i].remove();                                                         

                                        }
                                        
                                        Snap(this[0]).text.remove();                             // remove name
                                        
                                        var indexS = globalSpecs_Unions.indexOf(Snap(this[0]));  // remove from global list
                                        globalSpecs_Unions.splice(indexS,1);
                                        
                                        Snap(this[0]).remove();                                // remove target
                                       
                                      
                                    }
                                  }
                                }                 
                                
                              });
                              
                              // ATTRIBUTES //
                              
                              $.contextMenu({
                                selector: '#attribute',
                                items: {
                                
                                "datatype": {
                                        "name": "Data Type", 
                                        "items": {
                                            "data-key1": {"name": "INTEGER (default) ",
                                         callback: function(key, opt) {
                                                                      
                                            Snap(this[0]).dataT = "INTEGER";                                         
                                         
                                         }},
                                            "data-key2": {"name": "BIGINT",
                                         callback: function(key, opt) {
                                                                      
                                            Snap(this[0]).dataT = "BIGINT";
                                        
                                         }},                                        
                                           "data-key3": {"name": "SMALLINT",
                                         callback: function(key, opt) {
                                                                      
                                            Snap(this[0]).dataT = "SMALLINT";
                                        
                                         }},                                     
                                          "data-key4": {"name": "REAL",
                                         callback: function(key, opt) {
                                                                      
                                            Snap(this[0]).dataT = "REAL";
                                        
                                         }},
                                         "data-key5": {"name": "DOUBLE PRECISION",
                                         callback: function(key, opt) {
                                                                      
                                            Snap(this[0]).dataT = "DOUBLE PRECISION";
                                        
                                         }},
                                         "data-key6": {"name": "DECIMAL (i,j)",
                                         callback: function(key, opt) {
                                                                      
                                            Snap(this[0]).dataT = "DECIMAL";
                                            
                                            var str1 = prompt("Please enter a value for precision i:  ");
                                            var str2 = prompt("Please enter a value for scale j:  ");
                                            
                                            if(str1 !== null && str2 !== null){
                                                
                                                var i_input = Math.floor(Number(str1));
                                                var j_input = Math.floor(Number(str2));
                                                Snap(this[0]).i = i_input;
                                                Snap(this[0]).j = j_input; 
                                                
                                            }                              
                                            
                                        
                                         }},
                                         "data-key7": {"name": "CHARACTER (n)",
                                         callback: function(key, opt) {
                                                                      
                                            Snap(this[0]).dataT = "CHARACTER";
                                            
                                            var str1 = prompt("Please enter a value for n:  ");
                                            
                                            
                                            if(str1 !== null){
                                                
                                                var n_input = Math.floor(Number(str1));
                                                
                                                Snap(this[0]).n = n_input;
                                               
                                                
                                            }                              
                                            
                                        
                                         }},
                                         "data-key8": {"name": "CHARACTER VARYING (n)",
                                         callback: function(key, opt) {
                                                                      
                                            Snap(this[0]).dataT = "CHARACTER VARYING";
                                            
                                            var str1 = prompt("Please enter a value for n:  ");
                                            
                                            
                                            if(str1 !== null){
                                                
                                                var n_input = Math.floor(Number(str1));
                                                
                                                Snap(this[0]).n = n_input;
                                               
                                                
                                            }                              
                                            
                                        
                                         }},
                                         "data-key9": {"name": "BIT (n)",
                                         callback: function(key, opt) {
                                                                      
                                            Snap(this[0]).dataT = "BIT";
                                            
                                            var str1 = prompt("Please enter a value for n:  ");
                                            
                                            
                                            if(str1 !== null){
                                                
                                                var n_input = Math.floor(Number(str1));
                                                
                                                Snap(this[0]).n = n_input;
                                               
                                                
                                            }                              
                                            
                                        
                                         }},
                                         "data-key10": {"name": "BIT VARYING (n)",
                                         callback: function(key, opt) {
                                                                      
                                            Snap(this[0]).dataT = "BIT VARYING";
                                            
                                            var str1 = prompt("Please enter a value for n:  ");
                                            
                                            
                                            if(str1 !== null){
                                                
                                                var n_input = Math.floor(Number(str1));
                                                
                                                Snap(this[0]).n = n_input;
                                               
                                                
                                            }                              
                                            
                                        
                                         }},
                                         "data-key11": {"name": "BOOLEAN",
                                         callback: function(key, opt) {
                                                                      
                                            Snap(this[0]).dataT = "BOOLEAN";
                                        
                                         }},
                                         "data-key12": {"name": "XML",
                                         callback: function(key, opt) {
                                                                      
                                            Snap(this[0]).dataT = "XML";
                                        
                                         }},
                                         "data-key13": {"name": "TIME",
                                         callback: function(key, opt) {
                                                                      
                                            Snap(this[0]).dataT = "TIME";
                                        
                                         }},
                                         "data-key14": {"name": "DATE",
                                         callback: function(key, opt) {
                                                                      
                                            Snap(this[0]).dataT = "DATE";
                                        
                                         }},
                                         "data-key15": {"name": "TIMESTAMP",
                                         callback: function(key, opt) {
                                                                      
                                            Snap(this[0]).dataT = "TIMESTAMP";
                                        
                                         }},
                                         "data-key16": {"name": "INTERVAL",
                                         callback: function(key, opt) {
                                                                      
                                            Snap(this[0]).dataT = "INTERVAL";
                                        
                                         }},
                                         "data-key17": {"name": "Other (Add Type)",
                                         callback: function(key, opt) {
                                              
                                             var str1 = prompt("Please enter your data type:  ");
                                            
                                            
                                            if(str1 !== null){
                                                
                                                Snap(this[0]).dataT = str1;
                                                
                                            }                                    
                                            
                                        
                                         }},
                                         
                                            
                                    }
                                },                                
                                 "owner": {
                                        "name": "Owner", 
                                        "items": {
                                            "nowner-key1": {"name": "Set",
                                         callback: function(key, opt) {
                                                                      
                                            if( Snap(this[0]).owner !== 0){
                                            
                                                var indexE = Snap(this[0]).owner.attributes.indexOf(Snap(this[0]).ownerLine);  // remove old owner first
                                                Snap(this[0]).owner.attributes.splice(indexE,1);                                                           
                                                Snap(this[0]).ownerLine.remove();
                                                Snap(this[0]).owner = 0;
                                             
                                            
                                        }                                        
                                 
                                            // make this shape a start point                                   
                                               L.start = Snap(this[0]);                                    
                                              // console.log("START " + L.start.cx + ", " + L.start.cy);
                                               line_cr = 2;   
                                         
                                         
                                         }},
                                            "owner-key2": {"name": "Remove",
                                         callback: function(key, opt) {
                                                                      
                                            if( Snap(this[0]).owner !== 0){
                                            
                                                var indexE = Snap(this[0]).owner.attributes.indexOf(Snap(this[0]).ownerLine);  // find position of line within owner's attributes list
                                                Snap(this[0]).owner.attributes.splice(indexE,1);                         // remove element with that position from attributes list                                   
                                                Snap(this[0]).ownerLine.remove();
                                            
                                            } 

                                            Snap(this[0]).owner = 0;
                                            Snap(this[0]).ownerLine.remove(); 
                                        
                                         }                                      
                                         
                                         }
                                            
                                    }
                                },                                 
                                
                                   "primary": {
                                        "name": "Primary", 
                                        "items": {
                                            "primary-key1": {"name": "Yes",
                                         callback: function(key, opt) {
                                                                      
                                            Snap(this[0]).primary = true;
                                            Snap(this[0]).unique = true;
                                            Snap(this[0]).notNull = true;
                                         
                                         
                                         }},
                                            "primary-key2": {"name": "No",
                                         callback: function(key, opt) {
                                                                      
                                            Snap(this[0]).primary = false;
                                        
                                         }                                      
                                         
                                         }
                                            
                                    }
                                },                               
                                  
                                  "unique": {
                                        "name": "Unique", 
                                        "items": {
                                            "unique-key1": {"name": "Yes",
                                                                        
                                         callback: function(key, opt) {
                                                                      
                                            Snap(this[0]).unique = true;
                                            Snap(this[0]).notNull = true;
                                         
                                         
                                         }},
                                            "unique-key2": {"name": "No",
                                                
                                         callback: function(key, opt) {
                                                                      
                                            Snap(this[0]).unique = false;
                                        
                                         }                                      
                                         
                                         }
                                            
                                    }
                                },
                                  "notnull": {
                                        "name": "Not NULL", 
                                        "items": {
                                            "notnull-key1": {"name": "Yes",
                                         callback: function(key, opt) {
                                                                      
                                            Snap(this[0]).notNull = true;
                                         
                                         
                                         }},
                                            "notnull-key2": {"name": "No",
                                         callback: function(key, opt) {
                                                                      
                                            Snap(this[0]).notNull = false;
                                        
                                         }                                      
                                         
                                         }
                                            
                                    }
                                }, 
                                
                                 properties: {
                                    name: "Properties",
                                    callback: function(key, opt) {
                                    
                                    var unique = ""; 
                                    var primary = "";
                                    var notnull = "";
                                    var data_type = "";
                                    
                                    if(Snap(this[0]).unique === true){
                                        
                                        unique = "Yes";                                        
                                    }
                                    
                                    else {
                                        
                                        unique = "No";                                        
                                    }
                                    
                                     if(Snap(this[0]).primary === true){
                                        
                                        primary = "Yes";                                        
                                    }
                                    
                                    else {
                                        
                                        primary = "No";                                        
                                    }
                                    
                                    if(Snap(this[0]).notNull === true){
                                        
                                        notnull = "Yes";                                        
                                    }
                                    
                                    else {
                                        
                                        notnull = "No";                                        
                                    }
                                    
                                    if(Snap(this[0]).dataT === "DECIMAL"){
                                        
                                        data_type = Snap(this[0]).dataT + "(" + Snap(this[0]).i + ", " + Snap(this[0]).j + ")" ;                                       
                                    }
                                    
                                    else if (Snap(this[0]).dataT === "CHARACTER" || Snap(this[0]).dataT === "CHARACTER VARYING" || Snap(this[0]).dataT === "BIT" || Snap(this[0]).dataT === "BIT VARYING"){
                                        
                                           data_type = Snap(this[0]).dataT + "(" + Snap(this[0]).n + ")" ;                                     
                                    }
                                    
                                    else{
                                        
                                        data_type = Snap(this[0]).dataT;
                                        
                                    }
                                    
                                    swal("Properties", "Attribute name: " + Snap(this[0]).name + '\n' + "Primary: " + primary + '\n' + "Unique: " + unique + '\n' + "Not NULL: " + notnull  + '\n' + "Data Type: " + data_type);    
                                        
                                        
                                                                                  
                                      
                                    }
                                  },
                                
                                  rename: {
                                    name: "Rename",
                                    callback: function(key, opt) {                                      
                                        
                                        
                                    var str = prompt("Please enter a name.", "Name"); 
                                 
                                        
                                         str = str.replace(/ /g,"_");
                                         
                                         if (str !== null) {

                                            Snap(this[0]).name = str;  

                                        }                                               
                                      
                                    }
                                  },                                  
                                 
                                  delete: {
                                    name: "Delete",
                                    callback: function(key, opt) {
                                        
                                         for(i=0; i<Snap(this[0]).attributes.length; i++){        // set "owner" of all attributes = 0
                                            
                                                Snap(this[0]).attributes[i].start.owner = 0;         
                                                Snap(this[0]).attributes[i].remove();                // remove line                                                               

                                        }
                                        
                                        if( Snap(this[0]).owner !== 0){
                                            
                                            var indexE = Snap(this[0]).owner.attributes.indexOf(Snap(this[0]).ownerLine);  // find position of line within owner's attributes list
                                            Snap(this[0]).owner.attributes.splice(indexE,1);                                 // remove element with that position from attributes list                                   
                                            Snap(this[0]).ownerLine.remove();
                                            
                                        }   
                                        
                                       
                                        Snap(this[0]).text.remove();                             // remove name
                                        
                                        var indexS = globalAttributes.indexOf(Snap(this[0]));  // remove from global list
                                        globalAttributes.splice(indexS,1);
                                        
                                        Snap(this[0]).remove();                                // remove target 
                                      
                                    }
                                  }                
                                 
                                }                 
                                
                              });
                              
                              //DERIVED 
                              
                              $.contextMenu({
                                selector: '#derived_attribute',
                                items: {
                                  
                                    "datatype": {
                                        "name": "Data Type", 
                                        "items": {
                                            "data-key1": {"name": "INTEGER (default) ",
                                         callback: function(key, opt) {
                                                                      
                                            Snap(this[0]).dataT = "INTEGER";                                         
                                         
                                         }},
                                            "data-key2": {"name": "BIGINT",
                                         callback: function(key, opt) {
                                                                      
                                            Snap(this[0]).dataT = "BIGINT";
                                        
                                         }},                                        
                                           "data-key3": {"name": "SMALLINT",
                                         callback: function(key, opt) {
                                                                      
                                            Snap(this[0]).dataT = "SMALLINT";
                                        
                                         }},                                     
                                          "data-key4": {"name": "REAL",
                                         callback: function(key, opt) {
                                                                      
                                            Snap(this[0]).dataT = "REAL";
                                        
                                         }},
                                         "data-key5": {"name": "DOUBLE PRECISION",
                                         callback: function(key, opt) {
                                                                      
                                            Snap(this[0]).dataT = "DOUBLE PRECISION";
                                        
                                         }},
                                         "data-key6": {"name": "DECIMAL (i,j)",
                                         callback: function(key, opt) {
                                                                      
                                            Snap(this[0]).dataT = "DECIMAL";
                                            
                                            var str1 = prompt("Please enter a value for precision i:  ");
                                            var str2 = prompt("Please enter a value for scale j:  ");
                                            
                                            if(str1 !== null && str2 !== null){
                                                
                                                var i_input = Math.floor(Number(str1));
                                                var j_input = Math.floor(Number(str2));
                                                Snap(this[0]).i = i_input;
                                                Snap(this[0]).j = j_input; 
                                                
                                            }                              
                                            
                                        
                                         }},
                                         "data-key7": {"name": "CHARACTER (n)",
                                         callback: function(key, opt) {
                                                                      
                                            Snap(this[0]).dataT = "CHARACTER";
                                            
                                            var str1 = prompt("Please enter a value for n:  ");
                                            
                                            
                                            if(str1 !== null){
                                                
                                                var n_input = Math.floor(Number(str1));
                                                
                                                Snap(this[0]).n = n_input;
                                               
                                                
                                            }                              
                                            
                                        
                                         }},
                                         "data-key8": {"name": "CHARACTER VARYING (n)",
                                         callback: function(key, opt) {
                                                                      
                                            Snap(this[0]).dataT = "CHARACTER VARYING";
                                            
                                            var str1 = prompt("Please enter a value for n:  ");
                                            
                                            
                                            if(str1 !== null){
                                                
                                                var n_input = Math.floor(Number(str1));
                                                
                                                Snap(this[0]).n = n_input;
                                               
                                                
                                            }                              
                                            
                                        
                                         }},
                                         "data-key9": {"name": "BIT (n)",
                                         callback: function(key, opt) {
                                                                      
                                            Snap(this[0]).dataT = "BIT";
                                            
                                            var str1 = prompt("Please enter a value for n:  ");
                                            
                                            
                                            if(str1 !== null){
                                                
                                                var n_input = Math.floor(Number(str1));
                                                
                                                Snap(this[0]).n = n_input;
                                               
                                                
                                            }                              
                                            
                                        
                                         }},
                                         "data-key10": {"name": "BIT VARYING (n)",
                                         callback: function(key, opt) {
                                                                      
                                            Snap(this[0]).dataT = "BIT VARYING";
                                            
                                            var str1 = prompt("Please enter a value for n:  ");
                                            
                                            
                                            if(str1 !== null){
                                                
                                                var n_input = Math.floor(Number(str1));
                                                
                                                Snap(this[0]).n = n_input;
                                               
                                                
                                            }                              
                                            
                                        
                                         }},
                                         "data-key11": {"name": "BOOLEAN",
                                         callback: function(key, opt) {
                                                                      
                                            Snap(this[0]).dataT = "BOOLEAN";
                                        
                                         }},
                                         "data-key12": {"name": "XML",
                                         callback: function(key, opt) {
                                                                      
                                            Snap(this[0]).dataT = "XML";
                                        
                                         }},
                                         "data-key13": {"name": "TIME",
                                         callback: function(key, opt) {
                                                                      
                                            Snap(this[0]).dataT = "TIME";
                                        
                                         }},
                                         "data-key14": {"name": "DATE",
                                         callback: function(key, opt) {
                                                                      
                                            Snap(this[0]).dataT = "DATE";
                                        
                                         }},
                                         "data-key15": {"name": "TIMESTAMP",
                                         callback: function(key, opt) {
                                                                      
                                            Snap(this[0]).dataT = "TIMESTAMP";
                                        
                                         }},
                                         "data-key16": {"name": "INTERVAL",
                                         callback: function(key, opt) {
                                                                      
                                            Snap(this[0]).dataT = "INTERVAL";
                                        
                                         }},
                                         "data-key17": {"name": "Other (Add Type)",
                                         callback: function(key, opt) {
                                              
                                             var str1 = prompt("Please enter your data type:  ");
                                            
                                            
                                            if(str1 !== null){
                                                
                                                Snap(this[0]).dataT = str1;
                                                
                                            }                                    
                                            
                                        
                                         }},
                                         
                                            
                                    }
                                },
                                                                
                                 "owner": {
                                        "name": "Owner", 
                                        "items": {
                                            "nowner-key1": {"name": "Set",
                                         callback: function(key, opt) {
                                                                      
                                            if( Snap(this[0]).owner !== 0){
                                            
                                                var indexE = Snap(this[0]).owner.attributes.indexOf(Snap(this[0]).ownerLine);  // remove old owner first
                                                Snap(this[0]).owner.attributes.splice(indexE,1);                                                           
                                                Snap(this[0]).ownerLine.remove();
                                                Snap(this[0]).owner = 0;
                                             
                                            
                                        }                                        
                                 
                                            // make this shape a start point                                   
                                               L.start = Snap(this[0]);                                    
                                              // console.log("START " + L.start.cx + ", " + L.start.cy);
                                               line_cr = 2;   
                                         
                                         
                                         }},
                                            "owner-key2": {"name": "Remove",
                                         callback: function(key, opt) {
                                                                      
                                            if( Snap(this[0]).owner !== 0){
                                            
                                                var indexE = Snap(this[0]).owner.attributes.indexOf(Snap(this[0]).ownerLine);  // find position of line within owner's attributes list
                                                Snap(this[0]).owner.attributes.splice(indexE,1);                         // remove element with that position from attributes list                                   
                                                Snap(this[0]).ownerLine.remove();
                                            
                                            } 

                                            Snap(this[0]).owner = 0;
                                            Snap(this[0]).ownerLine.remove(); 
                                        
                                         }                                      
                                         
                                         }
                                            
                                    }
                                },                                 
                                
                                                    
                                  rename: {
                                    name: "Rename",
                                    callback: function(key, opt) {                                      
                                        
                                        
                                    var str = prompt("Please enter a name.", "Name"); 
                                 
                                        
                                         str = str.replace(/ /g,"_");
                                         
                                         if (str !== null) {

                                            Snap(this[0]).name = str;  

                                        }                                               
                                      
                                    }
                                  },
                                  
                                   properties: {
                                    name: "Properties",
                                    callback: function(key, opt) {
                                    
                                    var unique = ""; 
                                    var primary = "";
                                    var notnull = "";
                                    var data_type = "";
                                    
                                    if(Snap(this[0]).unique === true){
                                        
                                        unique = "Yes";                                        
                                    }
                                    
                                    else {
                                        
                                        unique = "No";                                        
                                    }
                                    
                                     if(Snap(this[0]).primary === true){
                                        
                                        primary = "Yes";                                        
                                    }
                                    
                                    else {
                                        
                                        primary = "No";                                        
                                    }
                                    
                                    if(Snap(this[0]).notNull === true){
                                        
                                        notnull = "Yes";                                        
                                    }
                                    
                                    else {
                                        
                                        notnull = "No";                                        
                                    }
                                    
                                    if(Snap(this[0]).dataT === "DECIMAL"){
                                        
                                        data_type = Snap(this[0]).dataT + "(" + Snap(this[0]).i + ", " + Snap(this[0]).j + ")" ;                                       
                                    }
                                    
                                    else if (Snap(this[0]).dataT === "CHARACTER" || Snap(this[0]).dataT === "CHARACTER VARYING" || Snap(this[0]).dataT === "BIT" || Snap(this[0]).dataT === "BIT VARYING"){
                                        
                                           data_type = Snap(this[0]).dataT + "(" + Snap(this[0]).n + ")" ;                                     
                                    }
                                    
                                    else{
                                        
                                        data_type = Snap(this[0]).dataT;
                                        
                                    }
                                    
                                    swal("Properties", "Attribute name: " + Snap(this[0]).name + '\n' + "Primary: " + primary + '\n' + "Unique: " + unique + '\n' + "Not NULL: " + notnull  + '\n' + "Data Type: " + data_type);    
                                        
                                        
                                                                                  
                                      
                                    }
                                  },
                                 
                                  delete: {
                                    name: "Delete",
                                    callback: function(key, opt) {
                                        
                                         for(i=0; i<Snap(this[0]).attributes.length; i++){        // set "owner" of all attributes = 0
                                            
                                                Snap(this[0]).attributes[i].start.owner = 0;         
                                                Snap(this[0]).attributes[i].remove();                // remove line                                                               

                                        }
                                        
                                        if( Snap(this[0]).owner !== 0){
                                            
                                            var indexE = Snap(this[0]).owner.attributes.indexOf(Snap(this[0]).ownerLine);  // find position of line within owner's attributes list
                                            Snap(this[0]).owner.attributes.splice(indexE,1);                                 // remove element with that position from attributes list                                   
                                            Snap(this[0]).ownerLine.remove();
                                            
                                        }   
                                        
                                       
                                        Snap(this[0]).text.remove();                             // remove name
                                        
                                        var indexS = globalAttributes.indexOf(Snap(this[0]));  // remove from global list
                                        globalAttributes.splice(indexS,1);
                                        
                                        Snap(this[0]).remove();                                // remove target 
                                      
                                    }
                                  }                
                                 
                                }                 
                                
                              });
                              
                              // MULTIVALUED
                              
                              $.contextMenu({
                                selector: '#multi_attribute',
                                items: {    
                                    
                                    "datatype": {
                                        "name": "Data Type", 
                                        "items": {
                                            "data-key1": {"name": "INTEGER (default) ",
                                         callback: function(key, opt) {
                                                                      
                                            Snap(this[0]).dataT = "INTEGER";                                         
                                         
                                         }},
                                            "data-key2": {"name": "BIGINT",
                                         callback: function(key, opt) {
                                                                      
                                            Snap(this[0]).dataT = "BIGINT";
                                        
                                         }},                                        
                                           "data-key3": {"name": "SMALLINT",
                                         callback: function(key, opt) {
                                                                      
                                            Snap(this[0]).dataT = "SMALLINT";
                                        
                                         }},                                     
                                          "data-key4": {"name": "REAL",
                                         callback: function(key, opt) {
                                                                      
                                            Snap(this[0]).dataT = "REAL";
                                        
                                         }},
                                         "data-key5": {"name": "DOUBLE PRECISION",
                                         callback: function(key, opt) {
                                                                      
                                            Snap(this[0]).dataT = "DOUBLE PRECISION";
                                        
                                         }},
                                         "data-key6": {"name": "DECIMAL (i,j)",
                                         callback: function(key, opt) {
                                                                      
                                            Snap(this[0]).dataT = "DECIMAL";
                                            
                                            var str1 = prompt("Please enter a value for precision i:  ");
                                            var str2 = prompt("Please enter a value for scale j:  ");
                                            
                                            if(str1 !== null && str2 !== null){
                                                
                                                var i_input = Math.floor(Number(str1));
                                                var j_input = Math.floor(Number(str2));
                                                Snap(this[0]).i = i_input;
                                                Snap(this[0]).j = j_input; 
                                                
                                            }                              
                                            
                                        
                                         }},
                                         "data-key7": {"name": "CHARACTER (n)",
                                         callback: function(key, opt) {
                                                                      
                                            Snap(this[0]).dataT = "CHARACTER";
                                            
                                            var str1 = prompt("Please enter a value for n:  ");
                                            
                                            
                                            if(str1 !== null){
                                                
                                                var n_input = Math.floor(Number(str1));
                                                
                                                Snap(this[0]).n = n_input;
                                               
                                                
                                            }                              
                                            
                                        
                                         }},
                                         "data-key8": {"name": "CHARACTER VARYING (n)",
                                         callback: function(key, opt) {
                                                                      
                                            Snap(this[0]).dataT = "CHARACTER VARYING";
                                            
                                            var str1 = prompt("Please enter a value for n:  ");
                                            
                                            
                                            if(str1 !== null){
                                                
                                                var n_input = Math.floor(Number(str1));
                                                
                                                Snap(this[0]).n = n_input;
                                               
                                                
                                            }                              
                                            
                                        
                                         }},
                                         "data-key9": {"name": "BIT (n)",
                                         callback: function(key, opt) {
                                                                      
                                            Snap(this[0]).dataT = "BIT";
                                            
                                            var str1 = prompt("Please enter a value for n:  ");
                                            
                                            
                                            if(str1 !== null){
                                                
                                                var n_input = Math.floor(Number(str1));
                                                
                                                Snap(this[0]).n = n_input;
                                               
                                                
                                            }                              
                                            
                                        
                                         }},
                                         "data-key10": {"name": "BIT VARYING (n)",
                                         callback: function(key, opt) {
                                                                      
                                            Snap(this[0]).dataT = "BIT VARYING";
                                            
                                            var str1 = prompt("Please enter a value for n:  ");
                                            
                                            
                                            if(str1 !== null){
                                                
                                                var n_input = Math.floor(Number(str1));
                                                
                                                Snap(this[0]).n = n_input;
                                               
                                                
                                            }                              
                                            
                                        
                                         }},
                                         "data-key11": {"name": "BOOLEAN",
                                         callback: function(key, opt) {
                                                                      
                                            Snap(this[0]).dataT = "BOOLEAN";
                                        
                                         }},
                                         "data-key12": {"name": "XML",
                                         callback: function(key, opt) {
                                                                      
                                            Snap(this[0]).dataT = "XML";
                                        
                                         }},
                                         "data-key13": {"name": "TIME",
                                         callback: function(key, opt) {
                                                                      
                                            Snap(this[0]).dataT = "TIME";
                                        
                                         }},
                                         "data-key14": {"name": "DATE",
                                         callback: function(key, opt) {
                                                                      
                                            Snap(this[0]).dataT = "DATE";
                                        
                                         }},
                                         "data-key15": {"name": "TIMESTAMP",
                                         callback: function(key, opt) {
                                                                      
                                            Snap(this[0]).dataT = "TIMESTAMP";
                                        
                                         }},
                                         "data-key16": {"name": "INTERVAL",
                                         callback: function(key, opt) {
                                                                      
                                            Snap(this[0]).dataT = "INTERVAL";
                                        
                                         }},
                                         "data-key17": {"name": "Other (Add Type)",
                                         callback: function(key, opt) {
                                              
                                             var str1 = prompt("Please enter your data type:  ");
                                            
                                            
                                            if(str1 !== null){
                                                
                                                Snap(this[0]).dataT = str1;
                                                
                                            }                                    
                                            
                                        
                                         }},
                                         
                                            
                                    }
                                }, 
                                 "owner": {
                                        "name": "Owner", 
                                        "items": {
                                            "nowner-key1": {"name": "Set",
                                         callback: function(key, opt) {
                                                                      
                                            if( Snap(this[0]).owner !== 0){
                                            
                                                var indexE = Snap(this[0]).owner.attributes.indexOf(Snap(this[0]).ownerLine);  // remove old owner first
                                                Snap(this[0]).owner.attributes.splice(indexE,1);                                                           
                                                Snap(this[0]).ownerLine.remove();
                                                Snap(this[0]).owner = 0;
                                             
                                            
                                        }                                        
                                 
                                            // make this shape a start point                                   
                                               L.start = Snap(this[0]);                                    
                                              // console.log("START " + L.start.cx + ", " + L.start.cy);
                                               line_cr = 2;   
                                         
                                         
                                         }},
                                            "owner-key2": {"name": "Remove",
                                         callback: function(key, opt) {
                                                                      
                                            if( Snap(this[0]).owner !== 0){
                                            
                                                var indexE = Snap(this[0]).owner.attributes.indexOf(Snap(this[0]).ownerLine);  // find position of line within owner's attributes list
                                                Snap(this[0]).owner.attributes.splice(indexE,1);                         // remove element with that position from attributes list                                   
                                                Snap(this[0]).ownerLine.remove();
                                            
                                            } 

                                            Snap(this[0]).owner = 0;
                                            Snap(this[0]).ownerLine.remove(); 
                                        
                                         }                                      
                                         
                                         }
                                            
                                    }
                                },                                 
                                
                                                      
                                  
                                  "unique": {
                                        "name": "Unique", 
                                        "items": {
                                            "unique-key1": {"name": "Yes",
                                                                        
                                         callback: function(key, opt) {
                                                                      
                                            Snap(this[0]).unique = true;
                                            Snap(this[0]).notNull = true;
                                         
                                         
                                         }},
                                            "unique-key2": {"name": "No",
                                                
                                         callback: function(key, opt) {
                                                                      
                                            Snap(this[0]).unique = false;
                                        
                                         }                                      
                                         
                                         }
                                            
                                    }
                                },
                                  
                                  rename: {
                                    name: "Rename",
                                    callback: function(key, opt) {                                      
                                        
                                        
                                    var str = prompt("Please enter a name.", "Name"); 
                                 
                                        
                                         str = str.replace(/ /g,"_");
                                         
                                         if (str !== null) {

                                            Snap(this[0]).name = str;  

                                        }                                               
                                      
                                    }
                                  },
                                  
                                  properties: {
                                    name: "Properties",
                                    callback: function(key, opt) {
                                    
                                    var unique = ""; 
                                    var primary = "";
                                    var notnull = "";
                                    var data_type = "";
                                    
                                    if(Snap(this[0]).unique === true){
                                        
                                        unique = "Yes";                                        
                                    }
                                    
                                    else {
                                        
                                        unique = "No";                                        
                                    }
                                    
                                     if(Snap(this[0]).primary === true){
                                        
                                        primary = "Yes";                                        
                                    }
                                    
                                    else {
                                        
                                        primary = "No";                                        
                                    }
                                    
                                    if(Snap(this[0]).notNull === true){
                                        
                                        notnull = "Yes";                                        
                                    }
                                    
                                    else {
                                        
                                        notnull = "No";                                        
                                    }
                                    
                                    if(Snap(this[0]).dataT === "DECIMAL"){
                                        
                                        data_type = Snap(this[0]).dataT + "(" + Snap(this[0]).i + ", " + Snap(this[0]).j + ")" ;                                       
                                    }
                                    
                                    else if (Snap(this[0]).dataT === "CHARACTER" || Snap(this[0]).dataT === "CHARACTER VARYING" || Snap(this[0]).dataT === "BIT" || Snap(this[0]).dataT === "BIT VARYING"){
                                        
                                           data_type = Snap(this[0]).dataT + "(" + Snap(this[0]).n + ")" ;                                     
                                    }
                                    
                                    else{
                                        
                                        data_type = Snap(this[0]).dataT;
                                        
                                    }
                                    
                                    swal("Properties", "Attribute name: " + Snap(this[0]).name + '\n' + "Primary: " + primary + '\n' + "Unique: " + unique + '\n' + "Not NULL: " + notnull  + '\n' + "Data Type: " + data_type);    
                                        
                                        
                                                                                  
                                      
                                    }
                                  },
                                  delete: {
                                    name: "Delete",
                                    callback: function(key, opt) {
                                        
                                         for(i=0; i<Snap(this[0]).attributes.length; i++){        // set "owner" of all attributes = 0
                                            
                                                Snap(this[0]).attributes[i].start.owner = 0;         
                                                Snap(this[0]).attributes[i].remove();                // remove line                                                               

                                        }
                                        
                                        if( Snap(this[0]).owner !== 0){
                                            
                                            var indexE = Snap(this[0]).owner.attributes.indexOf(Snap(this[0]).ownerLine);  // find position of line within owner's attributes list
                                            Snap(this[0]).owner.attributes.splice(indexE,1);                                 // remove element with that position from attributes list                                   
                                            Snap(this[0]).ownerLine.remove();
                                            
                                        }   
                                        
                                       
                                        Snap(this[0]).text.remove();                             // remove name
                                        
                                        var indexS = globalAttributes.indexOf(Snap(this[0]));  // remove from global list
                                        globalAttributes.splice(indexS,1);
                                        
                                        Snap(this[0]).remove();                                // remove target 
                                      
                                    }
                                  }                
                                 
                                }                 
                                
                              });
                              
                    
              
  