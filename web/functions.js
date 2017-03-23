                     
                          
                          function createRect(rect_type){     
                              
                            var string = prompt("Please enter a name for this Entity.", "Undefined");  // ask for name
                            
                            if (string == null) {
                                     
                                     string = "Undefined";
                                        
                                 }
                              
                            var r = Snap('#svg');
                            
                            if(rect_type === "entity"){                            
                            
                                var newRect = r.rect(100,100,110,55);
                                newRect.attr({                            
                                    fill:'#ccffe6',
                                    stroke:'#000',
                                    strokeWidth: 2
                                });                     
                            
                            }                     
                            
                            else if (rect_type === "weak_entity"){
                                    
                                var outerBorder = r.rect(100,100,110,55);
                                outerBorder.attr({                            
                                    fill:'#ccffe6',
                                    stroke:'#000',
                                    strokeWidth: 2
                                });                                           
                                
                                var innerBorder = r.rect(107,105,96,45);
                                innerBorder.attr({                              
                                    fill:'#ccffe6',
                                    stroke:'#000',
                                    strokeWidth: 2
                                });  
                                
                                var newRect = r.group(outerBorder, innerBorder );
                                      
                              }
                              
                            newRect.name = string; 
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
                            newRect.text = t1;        
                            newRect.attributes = [];     // list of  attribute lines connected to this shape   
                            newRect.relationships = [];  // list of  relationship lines connected to this shape   
                            newRect.type = rect_type;                         
                            newRect.click( this.clickTrigger );                            
                            newRect.dblclick( addHandleFunc ); // start scaling upon double click                     
                            newRect.drag(); // use default drag() once shape is made 
                             
                            // bind to canvas
                            document.addEventListener('mousemove', function (e) {
    
                                    pos = newRect.getBBox();                                    
                                
                                    if(pos.cx < 0 || pos.cx > 1300 || pos.cy <0 || pos.cy > 800){                                
      
                                        newRect.animate({
                                            transform: 'T0 10 s1 1'
                                        }, 4000, mina.elastic);        
                                    };   
                                                                         
                            t1.attr({                                
                                text: newRect.name,                               
                                textAnchor: "middle",
                                x: pos.cx,
                                y: pos.cy                                 
                              });                      
                
                                }, false);    
                                
                               
                            
                          };
                         
                         function createEllipse(ell_type){            
                             
                            var string = prompt("Please enter a name for this Attribute.", "Undefined");  // ask for name
                            
                            if (string == null) {
                                     
                                     string = "Undefined";
                                        
                                 }
                             
                            var e = Snap('#svg');
                            
                            if(ell_type === "attribute"){
                                
                                var newEllipse = e.ellipse(720,120,60,25);
                                newEllipse.attr({                            
                                    fill:'#e6ccff',
                                    stroke:'#000',
                                    strokeWidth: 2
                                });                    
                            
                             }
                            
                            else if (ell_type === "derived_attribute"){
                                
                                var newEllipse = e.ellipse(720,120,60,25);
                                newEllipse.attr({                            
                                    fill:'#e6ccff',
                                    stroke:'#000',
                                    strokeDasharray: 10,
                                    strokeWidth: 2
                                   
                                });         
                                
                            }
                            
                             else if (ell_type === "multi_attribute"){                                
                                
                                var outerEllipse = e.ellipse(720,120,60,25);
                                outerEllipse.attr({                            
                                    fill:'#e6ccff',
                                    stroke:'#000',
                                    strokeWidth: 2
                                });      
                                
                                var innerEllipse = e.ellipse(720,120,51,19);
                                innerEllipse.attr({                            
                                    fill:'#e6ccff',
                                    stroke:'#000',
                                    strokeWidth: 2
                                });   
                                
                                var newEllipse = e.group(outerEllipse, innerEllipse);                                     
                                
                                
                            }           
                            
                             newEllipse.name = string; 
                             var bb2 = newEllipse.getBBox();                       
                             var t1 = e.text(bb2.cx, bb2.cy, newEllipse.name);
                            
                            newEllipse.text = t1;
                            newEllipse.attributes = [];            // list of  lines connected to this shape
                            newEllipse.type = ell_type;          // type
                            newEllipse.owner = 0;            // owner
                            newEllipse.ownerLine = 0;        // line connecting to owner
                            newEllipse.primary = false;
                            newEllipse.unique = false;
                            newEllipse.notNull = false;
                            newEllipse.click( this.clickTrigger );
                            newEllipse.dblclick( addHandleFunc ); // start scaling upon double click
                            newEllipse.drag();   
                            
                             document.addEventListener('mousemove', function (e) {
    
                                    pos = newEllipse.getBBox();                                    
                                
                                    if(pos.cx < 0 || pos.cx > 1300 || pos.cy <0 || pos.cy > 800){                                
      
                                        newEllipse.animate({
                                            transform: 'T0 0 s1 1'
                                        }, 4000, mina.elastic);        
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
                                                 
                         
                         
                         function createRhombus(rhombus_type){
                             
                            var string = prompt("Please enter a name for this Attribute.", "Undefined");  // ask for name
                            
                            if (string == null) {
                                     
                                     string = "Undefined";
                                        
                                 }                             
                             
                            var r = Snap('#svg');
                            
                            if(rhombus_type === "relationship"){
                            
                                var newRhombus = r.rect(1020,80,75,75);
                                newRhombus.attr({                            
                                    fill:'#ffffff',
                                    stroke:'#000',
                                    strokeWidth: 2
                                });                   
                            
                             }
                             
                             else if (rhombus_type === "identifying_rel"){
                                 
                                  var outerBorder = r.rect(1020,80,75,75);
                                outerBorder.attr({                            
                                    fill:'#ffffff',
                                    stroke:'#000',
                                    strokeWidth: 2
                                });                                         
                                
                                var innerBorder = r.rect(1028,88,60,60);
                                innerBorder.attr({                            
                                    fill:'#ffffff',
                                    stroke:'#000',
                                    strokeWidth: 2
                                });             
                                
                                var newRhombus = r.group(outerBorder, innerBorder );                            
                                 
                                 
                             }
                            
                            newRhombus.transform( 'r45,1020,80' );      // rotate
                            
                            newRhombus.name = string; 
                            
                            var bb2 = newRhombus.getBBox();
                            var t1 = r.text(bb2.cx, bb2.cy, newRhombus.name);
                            
                            newRhombus.text = t1;        
                            newRhombus.attributes = [];     // list of  attribute lines connected to this shape   
                            
                            newRhombus.leftLine = 0;    
                            newRhombus.rightLine = 0;
                            newRhombus.topLine = 0; 
                            newRhombus.botLine = 0;  
                            
                            newRhombus.leftEntity = 0;    
                            newRhombus.rightEntity = 0;
                            newRhombus.topEntity = 0; 
                            newRhombus.botEntity = 0;
                            
                            newRhombus.type = rhombus_type;                         
                            
                            newRhombus.click( this.clickTrigger );
                            newRhombus.dblclick( addHandleFunc ); // start scaling upon double click
                            newRhombus.drag();    
                            
                             document.addEventListener('mousemove', function (e) {
    
                                    pos = newRhombus.getBBox();                                    
                                
                                    if(pos.cx < 0 || pos.cx > 1300 || pos.cy <0 || pos.cy > 800){                                
      
                                        newRhombus.animate({
                                            transform: 'T0 0 s1 1 r45,1020,80'
                                        }, 4000, mina.elastic);        
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
                             
                             function addHandleFunc() {                       
                                 
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
                            
                            var del = 0; // for deleting
                            
                            var line_cr = 0; // for line connection      
                            
                            var rename_toggle = 0; // for renaming
                            
                            var remove_owner_toggle = 0; // for removing attribute connection 
                            
                            var primary_toggle = 0;  // for primary
                            
                            var neg_primary_toggle = 0;  // for primary
                            
                            var unique_toggle = 0; // for unique
                            
                            var neg_unique_toggle = 0; // for unique
                            
                            var not_null_toggle = 0;  // null or not null
                            
                            var sConnect = 0;  // for partial participation 
                            
                            var edge = 0;    
                            
                            var dConnect = 0; // for total participation  
                            
                            var remove_rel_connection = 0;
                            
                            var target_edge = 0;
                            
                            var startP, endP; 
                           
                            function removeRelConnection(temp){
                                
                              target_edge = temp;
                              remove_rel_connection = 1;                                
                                
                            };
                            
                             function connectSingle(temp) {
                                
                                 sConnect = 1;      
                                 edge = temp;
                                                             
                            };
                            
                            function connectDouble(temp) {
                                
                                 dConnect = 1;      
                                 edge = temp;                                      
                                                     
                            };
                            
                            function deleteElement() {
                                
                                 del = 1;                                 
                                
                            };
                            
                             function setPrimary(state) {
                                 
                                 if( state === 1){
                                
                                 primary_toggle = 1; 
                                 
                                 }
                                 
                                 else if (state === 0){
                                     
                                    neg_primary_toggle = 1; 
                                     
                                 }
                                
                            };
                            
                              function setUnique(state) {
                                
                                 if( state === 1){
                                
                                 unique_toggle = 1; 
                                 
                                 }
                                 
                                 else if (state === 0){
                                     
                                    neg_unique_toggle = 1; 
                                     
                                 }                                
                                
                            };
                            
                            function setNotNull() {
                                
                                 not_null_toggle = 1;                                 
                                
                            };
                          
                            function removeOwner(){
                                
                               remove_owner_toggle = 1;                                
                                
                            }
                            
                            function renameElement(){                     
                              
                             rename_toggle = 1; 
                                
                            }
                            
                            function setLine(){                         
  
                                 if (line_cr === 0){
                                    line_cr = 1;                                                                       
                                }  
  
                            };                    
                                                  
                         
                            var lsvg = Snap('#svg');
                            
                            var L = lsvg.line(0,0,0,0).attr({
                                stroke: "#000",
                                strokeWidth: 3
                                });  
                                
                         function clickTrigger () {       
                             
                               if ((remove_rel_connection === 1) && (this.type === "relationship" || this.type === "identifying_rel")){
                                   
                                   switch (target_edge){
                                     case 1:
                                         
                                        if( this.topLine !== 0){
                                            
                                            var indexE = this.topEntity.relationships.indexOf(this.topLine);  // remove old connection first
                                            this.topEntity.attributes.splice(indexE);  
                                            
                                            if(this.topLine.companion !== 0){                                             
                                              
                                                this.topLine.companion.remove();                                             
                                            }   
                                            
                                            this.topLine.remove();
                                            this.topEntity = 0;                                            
                                            
                                        }
                                    break; 
                                
                                    case 2:
                                         
                                        if( this.botLine !== 0){
                                            
                                            var indexE = this.botEntity.relationships.indexOf(this.botLine);  // remove old connection first
                                            this.botEntity.attributes.splice(indexE); 
                                            
                                            if(this.botLine.companion !== 0){                                             
                                              
                                                this.botLine.companion.remove();   
                                                
                                            }   
                                            
                                            this.botLine.remove();
                                            this.botEntity = 0;                                            
                                            
                                        }
                                    break;                              
                                     
                                     case 3:
                                         
                                         if( this.leftLine !== 0){
                                            
                                            var indexE = this.leftEntity.relationships.indexOf(this.leftLine);  // remove old connection first
                                            this.leftEntity.attributes.splice(indexE);    
                                            
                                            if(this.leftLine.companion !== 0){                                             
                                              
                                                this.leftLine.companion.remove();                                             
                                            }   
                                            
                                            this.leftLine.remove();
                                            this.leftEntity = 0;                                            
                                            
                                        }
                                    break; 
                                
                                    case 4:
                                         
                                        if( this.rightLine !== 0){
                                            
                                            var indexE = this.rightEntity.relationships.indexOf(this.rightLine);  // remove old connection first
                                            this.rightEntity.attributes.splice(indexE);  
                                            
                                            if(this.rightLine.companion !== 0){                                             
                                              
                                                this.rightLine.companion.remove();    
                                                
                                            }   
                                            
                                            this.rightLine.remove();
                                            this.rightEntity = 0;                                            
                                            
                                        }
                                        
                                    break;
                                        
                                        
                                    }
                                    
                                    target_edge = 0;
                                    remove_rel_connection = 0;
                                   
                                   
                                   
                               }
                               
                               
                                else if (del === 1){ 
                                    
                                    // we need to remove the connecting line from the other point as well
                                    // figure whether the "target" shape is a start or an end point
                                    
                                    if(this.type === "entity" || this.type === "weak_entity"){    
                                       
                                        for(i=0; i<this.attributes.length; i++){        // set "owner" of all attributes = 0
                                            
                                                this.attributes[i].start.owner = 0;         // start point of the line will always be the child
                                                this.attributes[i].remove();                // remove line                                                               

                                        }   
                                        
                                        for(i=0; i<this.relationships.length; i++){ 
                                            
                                                if(this.relationships[i].start.topEntity === this){

                                                        this.relationships[i].start.topLine = 0;         // start point of the line will always be the child


                                                    }
                                                    
                                                   if(this.relationships[i].start.botEntity === this){
                                                    
                                                    this.relationships[i].start.botLine = 0;         // start point of the line will always be the child
                                                                                     
                                                    
                                                }
                                            
                                            
                                                if(this.relationships[i].start.leftEntity === this){
                                                    
                                                    this.relationships[i].start.leftLine = 0;         // start point of the line will always be the child
                                                                                     
                                                    
                                                }
                                                
                                                if(this.relationships[i].start.rightEntity === this){
                                                    
                                                    this.relationships[i].start.rightLine = 0;         // start point of the line will always be the child
                                                                                     
                                                    
                                                }
                                                
                                                if(this.relationships[i].companion !== 0){    // remove double line, if total particilation                                            
                                              
                                                     this.relationships[i].companion.remove(); 
                                                     
                                                }    
                                                
                                                this.relationships[i].remove();                // remove line                                                 

                                        }   
                                    
                                 }
                                 
                                 
                                 else if(this.type === "relationship" || this.type === "identifying_rel"){    
                                        
                                        
                                        for(i=0; i<this.attributes.length; i++){        // set "owner" of all attributes = 0
                                            
                                                this.attributes[i].start.owner = 0;         // start point of the line will always be the child
                                                this.attributes[i].remove();                // remove line                                                               

                                        }  
                                        
                                        if( this.topEntity !== 0){
                                            
                                            var indexE = this.topEntity.relationships.indexOf(this.topLine);  // find position of line within owner's relationships list
                                            this.topEntity.relationships.splice(indexE);                         // remove element with that position from relationships list                                   
                                            
                                         if(this.topLine.companion !== 0){                                             
                                              
                                                this.topLine.companion.remove();                                             
                                         }                                        
                                            this.topLine.remove();
                                            
                                        }  
                                        
                                        if( this.botEntity !== 0){
                                            
                                            var indexE = this.botEntity.relationships.indexOf(this.botLine);  // find position of line within owner's relationships list
                                            this.botEntity.relationships.splice(indexE);                         // remove element with that position from relationships list                                   
                                            
                                         if(this.botLine.companion !== 0){                                             
                                              
                                                this.botLine.companion.remove();                                             
                                         }                                        
                                            this.botLine.remove();
                                            
                                        }        
                                        
                                        if( this.leftEntity !== 0){
                                            
                                            var indexE = this.leftEntity.relationships.indexOf(this.leftLine);  // find position of line within owner's relationships list
                                            this.leftEntity.relationships.splice(indexE);                         // remove element with that position from relationships list                                   
                                            
                                         if(this.leftLine.companion !== 0){                                             
                                              
                                                this.leftLine.companion.remove();
                                             
                                         }
                                        
                                            this.leftLine.remove();
                                            
                                        }    
                                        
                                        if( this.rightEntity !== 0){
                                            
                                            var indexE = this.rightEntity.relationships.indexOf(this.rightLine);  // find position of line within owner's relationships list
                                            this.rightEntity.relationships.splice(indexE);                         // remove element with that position from relationships list                                   
                                            
                                         if(this.rightLine.companion !== 0){                                             
                                              
                                                this.rightLine.companion.remove();                                             
                                         }                                        
                                            this.rightLine.remove();
                                            
                                        }        
                                    
                                 }
                                 
                                 
                                 else if(this.type === "attribute" || this.type === "derived_attribute" || this.type === "multi_attribute"){                                     
                                     
                                     
                                     for(i=0; i<this.attributes.length; i++){        // set "owner" of all attributes = 0
                                            
                                                this.attributes[i].start.owner = 0;         // start point of the line will always be the child 
                                                this.attributes[i].remove();                // remove line                                                               

                                        }
                                        
                                        if( this.owner !== 0){
                                            
                                            var indexE = this.owner.attributes.indexOf(this.ownerLine);  // find position of line within owner's attributes list
                                            this.owner.attributes.splice(indexE);                         // remove element with that position from attributes list                                   
                                            this.ownerLine.remove();
                                            
                                        }                            
                                     
                                 }
                                   
                                    del = 0;
                                    this.text.remove;                             // remove name
                                    this.remove();                                // remove target  
                                    
                                }  
                                
                                
                                else if(primary_toggle === 1){                                                           
                                    
                                    
                                    if( this.owner !== 0){                                     
                                        
                                        
                                       var size = this.owner.attributes.length;
                                       
                                       
                                       for(i=0; i<size; i++){        // set other attributes of the same owner as "non primary"
                                            
                                            this.owner.attributes[i].start.primary = false;                                                                                                      

                                        }                                   
                                    }                            
                                    
                                    this.primary = true;                        

                                    primary_toggle = 0;                               
                                    
                                }
                                
                                else if(neg_primary_toggle === 1){                             
                                    
                                    this.primary = false;                        

                                    neg_primary_toggle = 0;                               
                                    
                                }
                                
                                else if(unique_toggle === 1){                             
                                    
                                    this.unique = true;                        

                                    unique_toggle = 0;                               
                                    
                                }
                                
                                else if(neg_unique_toggle === 1){                             
                                    
                                    this.unique = false;                        

                                    neg_unique_toggle = 0;                               
                                    
                                }
                                
                                else if (not_null_toggle === 1){
                                    
                                    this.notNull = true;
                                    
                                    not_null_toggle = 0;
                                    
                                    
                                }
                                
                                
                                else if(rename_toggle === 1){
                                    
                                 var str = prompt("Please enter a name.", "Undefined"); 
                                 
                                 if (str == null) {
                                     
                                     str = "Undefined";
                                        
                                 }
                                 
                                 
                                 this.name = str ;
                                 
                                 rename_toggle = 0;                               
                                    
                                }
                                
                                 
                                 
                                 else if(remove_owner_toggle === 1){
                                     
                                     if(this.type === "attribute" || this.type === "derived_attribute" || this.type === "multi_attribute"){                                     
                                                                     
                                        if( this.owner !== 0){
                                            
                                            var indexE = this.owner.attributes.indexOf(this.ownerLine);  // find position of line within owner's attributes list
                                            this.owner.attributes.splice(indexE);                         // remove element with that position from attributes list                                   
                                            this.ownerLine.remove();
                                            
                                        } 
                                        
                                        this.owner = 0;
                                        this.ownerLine.remove();                                         
                                     
                                    }                                
                                     
                                     
                                 }
                                 
                                 // ATTRIBUTE LINES //
                           
                                
                                else if ((line_cr === 1) && (this.type === "attribute" || this.type === "derived_attribute" || this.type === "multi_attribute")){
                                    
                                     if( this.owner !== 0){
                                            
                                            var indexE = this.owner.attributes.indexOf(this.ownerLine);  // remove old owner first
                                            this.owner.attributes.splice(indexE);                                                           
                                            this.ownerLine.remove();
                                            this.owner = 0;
                                             
                                            
                                        }                                        
                                 
                                 // make this shape a start point                                   
                                    L.start = this;                                    
                                   // console.log("START " + L.start.cx + ", " + L.start.cy);
                                    line_cr = 2;                                       
                                 }                         
                                
                                
                                else if ((line_cr === 2)  && (L.start !== this)){ // make this shape an end point
                                   
                                  L.end = this;
                                  // console.log("END " + L.end.cx + ", " + L.end.cy);
                                  line_cr = 0; 
                                  
                                  var LLocal = lsvg.line(0,0,0,0).attr({
                                    stroke: "#000",
                                    strokeWidth: 3
                                  }); 
                                  
                                  LLocal.start = L.start;
                                  LLocal.end = L.end; 
                                  
                                  LLocal.start.owner = this;    // udate attribute owner 
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
                                
                                
                                    
                                }    
                                
                                 // PARTIAL RELATIONSHIP LINES //
                                 
                                 else if ((sConnect === 1) && (this.type === "relationship" || this.type === "identifying_rel")){
                                    
                                    
                                    
                                    switch (edge){
                                     case 1:
                                         
                                        if( this.topLine !== 0){
                                            
                                            var indexE = this.topEntity.relationships.indexOf(this.topLine);  // remove old connection first
                                            this.topEntity.attributes.splice(indexE);  
                                            
                                            if(this.topLine.companion !== 0){                                             
                                              
                                                this.topLine.companion.remove();                                             
                                            }   
                                            
                                            this.topLine.remove();
                                            this.topEntity = 0;                                            
                                            
                                        }
                                    break; 
                                
                                    case 2:
                                         
                                        if( this.botLine !== 0){
                                            
                                            var indexE = this.botEntity.relationships.indexOf(this.botLine);  // remove old connection first
                                            this.botEntity.attributes.splice(indexE); 
                                            
                                            if(this.botLine.companion !== 0){                                             
                                              
                                                this.botLine.companion.remove();   
                                                
                                            }   
                                            
                                            this.botLine.remove();
                                            this.botEntity = 0;                                            
                                            
                                        }
                                    break;                              
                                     
                                     case 3:
                                         
                                         if( this.leftLine !== 0){
                                            
                                            var indexE = this.leftEntity.relationships.indexOf(this.leftLine);  // remove old connection first
                                            this.leftEntity.attributes.splice(indexE);    
                                            
                                            if(this.leftLine.companion !== 0){                                             
                                              
                                                this.leftLine.companion.remove();                                             
                                            }   
                                            
                                            this.leftLine.remove();
                                            this.leftEntity = 0;                                            
                                            
                                        }
                                    break; 
                                
                                    case 4:
                                         
                                        if( this.rightLine !== 0){
                                            
                                            var indexE = this.rightEntity.relationships.indexOf(this.rightLine);  // remove old connection first
                                            this.rightEntity.attributes.splice(indexE);  
                                            
                                            if(this.rightLine.companion !== 0){                                             
                                              
                                                this.rightLine.companion.remove();    
                                                
                                            }   
                                            
                                            this.rightLine.remove();
                                            this.rightEntity = 0;                                            
                                            
                                        }
                                        
                                    break;
                                        
                                        
                                    }
                                    
                                                                     
                                 
                                 // make this shape a start point                                   
                                    L.start = this;                                    
                                   // console.log("START " + L.start.cx + ", " + L.start.cy);
                                    sConnect = 2;                                       
                                 }                         
                                
                                
                                else if ((sConnect === 2 )  && (L.start !== this) && (this.type === "entity" || this.type === "weak_entity" )){ // make this shape an end point
                                  
                                  L.end = this;
                                  // console.log("END " + L.end.cx + ", " + L.end.cy);
                                  sConnect = 0;
                               
                                  
                                  var LLocal = lsvg.line(0,0,0,0).attr({
                                    stroke: "#000",
                                    strokeWidth: 2
                                  }); 
                                  
                                 
                                  
                                  LLocal.start = L.start;
                                  LLocal.end = L.end; 
                                  LLocal.side = edge;
                                  LLocal.type = "partial";
                                  LLocal.companion = 0;                            
                                  
                                  edge = 0;
                                 
                                  
                                 switch (LLocal.side){
                                     
                                     case 1:

                                            {   LLocal.start.topEntity = this;    // udate left entity 
                                                LLocal.start.topLine = LLocal;  // update left line
                                            }
                                            break;
                                    case 2:

                                            {   LLocal.start.botEntity = this;    // udate left entity 
                                                LLocal.start.botLine = LLocal;  // update left line
                                            }
                                            break; 
                                            
                                    case 3:

                                            { 
                                                LLocal.start.leftEntity = this;    // udate left entity 
                                                LLocal.start.leftLine = LLocal;  // update left line
                                            }
                                            break;
                                    case 4:

                                            { 
                                                LLocal.start.rightEntity = this;    // udate left entity 
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
                                 
                                 switch (LLocal.side){
                                     
                                     case 1:

                                            {  
                                                xstart = startP.cx;
                                                ystart = startP.y;
                                                
                                            }
                                            break;
                                    case 2:

                                            {   
                                                xstart = startP.cx;
                                                ystart = startP.y2;
                                            }
                                            break; 
                                            
                                    case 3:

                                            { 
                                                xstart = startP.x; 
                                                ystart = startP.cy;
                                            }
                                            break;
                                    case 4:

                                            { 
                                                xstart = startP.x2;
                                                ystart = startP.cy;
                                            }
                                            break;                    
                                     
                             }                             
                                 

                                 LLocal.attr({x1: xstart, y1: ystart, x2: endP.x, y2: endP.cy});  // start point is on the left side of end point
                                 
                                 
                                 
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
                                
                                
                                    
                                }    
                                
                                
                                
                                
                                // TOTAL RELATIONSHIP LINES //
                                 
                                 else if ((dConnect === 1) && (this.type === "relationship" || this.type === "identifying_rel")){
                                    
                                    
                                    
                                    switch (edge){
                                     case 1:
                                         
                                        if( this.topLine !== 0){
                                            
                                            var indexE = this.topEntity.relationships.indexOf(this.topLine);  // remove old connection first
                                            this.topEntity.attributes.splice(indexE);  
                                            
                                            if(this.topLine.companion !== 0){                                             
                                              
                                                this.topLine.companion.remove();   
                                                
                                            }   
                                            
                                            this.topLine.remove();
                                            this.topEntity = 0;                                            
                                            
                                        }
                                    break; 
                                
                                    case 2:
                                         
                                        if( this.botLine !== 0){
                                            
                                            var indexE = this.botEntity.relationships.indexOf(this.botLine);  // remove old connection first
                                            this.botEntity.attributes.splice(indexE);   
                                            
                                            if(this.botLine.companion !== 0){                                             
                                              
                                                this.botLine.companion.remove();                                             
                                            }   
                                            
                                            this.botLine.remove();
                                            this.botEntity = 0;                                            
                                            
                                        }
                                    break;                              
                                     
                                     case 3:
                                         
                                         if( this.leftLine !== 0){
                                            
                                            var indexE = this.leftEntity.relationships.indexOf(this.leftLine);  // remove old connection first
                                            this.leftEntity.attributes.splice(indexE);   
                                            
                                            if(this.leftLine.companion !== 0){                                             
                                              
                                                this.leftLine.companion.remove();                                             
                                            }   
                                            
                                            
                                            this.leftLine.remove();
                                            this.leftEntity = 0;                                            
                                            
                                        }
                                    break; 
                                
                                    case 4:
                                         
                                        if( this.rightLine !== 0){
                                            
                                            var indexE = this.rightEntity.relationships.indexOf(this.rightLine);  // remove old connection first
                                            this.rightEntity.attributes.splice(indexE);   
                                            
                                            if(this.rightLine.companion !== 0){                                             
                                              
                                                this.rightLine.companion.remove();                                             
                                            }   
                                            
                                            
                                            this.rightLine.remove();
                                            this.rightEntity = 0;                                            
                                            
                                        }
                                    break;
                                        
                                        
                                    }
                                    
                                                                     
                                 
                                 // make this shape a start point                                   
                                    L.start = this;                                    
                                   // console.log("START " + L.start.cx + ", " + L.start.cy);
                                    dConnect = 2;                                       
                                 }                         
                                
                                
                                else if ((dConnect === 2 )  && (L.start !== this) && (this.type === "entity" || this.type === "weak_entity" )){ // make this shape an end point
                                  
                                  L.end = this;
                                  // console.log("END " + L.end.cx + ", " + L.end.cy);
                                  dConnect = 0;                                 
                                
                                  
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
                                  
                                  edge = 0;                              
                                  
                                 switch (LLocal.side){
                                     
                                     case 1:

                                            {   LLocal.start.topEntity = this;    // udate left entity 
                                                LLocal.start.topLine = LLocal;  // update left line
                                            }
                                            break;
                                    case 2:

                                            {   LLocal.start.botEntity = this;    // udate left entity 
                                                LLocal.start.botLine = LLocal;  // update left line
                                            }
                                            break; 
                                            
                                    case 3:

                                            { 
                                                LLocal.start.leftEntity = this;    // udate left entity 
                                                LLocal.start.leftLine = LLocal;  // update left line
                                            }
                                            break;
                                    case 4:

                                            { 
                                                LLocal.start.rightEntity = this;    // udate left entity 
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
                                 
                                 switch (LLocal.side){
                                     
                                     case 1:

                                            {  
                                                xstart = startP.cx;
                                                ystart = startP.y;
                                                
                                            }
                                            break;
                                    case 2:

                                            {   
                                                xstart = startP.cx;
                                                ystart = startP.y2;
                                            }
                                            break; 
                                            
                                    case 3:

                                            { 
                                                xstart = startP.x; 
                                                ystart = startP.cy;
                                            }
                                            break;
                                    case 4:

                                            { 
                                                xstart = startP.x2;
                                                ystart = startP.cy;
                                            }
                                            break;                    
                                     
                             }                             
                                 

                                 LLocal.attr({x1: xstart, y1: ystart, x2: endP.x, y2: endP.cy});  // start point is on the left side of end point
                               
                                 Companion.attr({x1: xstart, y1: ystart, x2: endP.x, y2: endP.cy});
                                 
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
                                
                                
                                    
                                }    
                                
                                
                               
                            
                            };                 
                            
                          
                            
                             
                        
                        