                     
                          
                          function createRect(rect_type){     
                              
                            var string = prompt("Please enter a name for this Entity.", "Undefined");  // ask for name
                            
                            if (string == null) {
                                     
                                     string = "Undefined";
                                        
                                 }
                                 
                            string = string.replace(/ /g,"_");     
                              
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
                            newRect.super = 0;
                            newRect.superLine = 0;    // in case it belongs to a superclass
                            newRect.subs = [];
                            newRect.specializations = [];
                            newRect.super_specializations = [];
                            newRect.unions = [];
                            newRect.union_subs = [];
                            newRect.click( this.clickTrigger );                            
                            newRect.dblclick( addHandleFunc ); // start scaling upon double click                     
                            newRect.drag(); // use default drag() once shape is made 
                             
                            // bind to canvas
                            document.addEventListener('mousemove', function (e) {
    
                                    pos = newRect.getBBox();                                    
                                
                                    if(pos.cx < 0 || pos.cx > 1300 || pos.cy <0 || pos.cy > 800){                                
      
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
                          
                          
                          function createCircle(c_type){                    
                             
                            var c = Snap('#svg');                            
                            
                                
                                var newCircle = c.circle(420,120,25);
                                newCircle.attr({                            
                                    fill:'#f2f4f3',
                                    stroke:'#000',
                                    strokeWidth: 2
                                });                          
                                
                                      
                            
                            if(c_type === "disjoint"){
                                
                               newCircle.name = "d";  
                                
                            }
                            
                            else if(c_type === "overlapping"){
                                
                               newCircle.name = "o";  
                                
                            }
                            
                            else if(c_type === "union"){
                                
                               newCircle.name = "U";  
                                
                            }
                            
                             
                             var bb2 = newCircle.getBBox();                       
                             var t1 = c.text(bb2.cx, bb2.cy + 5, newCircle.name);
                             
                             // for specializations
                            
                            newCircle.text = t1;                            
                            newCircle.type = c_type;          // type                            
                            newCircle.super = 0;            // owner
                            newCircle.superLine = 0;        // line connecting to owner
                            newCircle.subs = [];          // subclasses
                            newCircle.supers = [];       // superclasses
                            
                            // for unions
                            
                            newCircle.sub = 0;
                            newCircle.unionLine = 0;
                           
                            newCircle.click( this.clickTrigger );
                            
                            newCircle.drag();   
                            
                             document.addEventListener('mousemove', function (e) {
    
                                    pos = newCircle.getBBox();                                    
                                
                                    if(pos.cx < 0 || pos.cx > 1300 || pos.cy <0 || pos.cy > 800){                                
      
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
                         
                 
                         
                         
                         
                         function createEllipse(ell_type){            
                             
                            var string = prompt("Please enter a name for this Attribute.", "Undefined");  // ask for name
                            
                            if (string == null) {
                                     
                                     string = "Undefined";
                                        
                                 }
                                 
                            string = string.replace(/ /g,"_");
                             
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
                            newEllipse.dataT = "INTEGER";       // data type
                            newEllipse.n = 1;                  // characters/bits
                            newEllipse.i = 0;
                            newEllipse.j = 0;                // scale
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
                                                 
                         
                         
                         function createRhombus(rhombus_type){
                             
                            var string = prompt("Please enter a name for this Attribute.", "Undefined");  // ask for name
                            
                            if (string == null) {
                                     
                                     string = "Undefined";
                                        
                                 }    
                                 
                             string = string.replace(/ /g,"_");     
                             
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
                            
                            var change_ratio_to_one = 0;
                            
                            var change_ratio_to_N = 0;
                            
                            var ratio_edge = 0;  // for cardinality ratio
                            
                            var set_data = 0; // data type
                            
                            var v = "INTEGER";
                            
                            var n_input = 1;
                            
                            var i_input= 0;
                      
                            var j_input = 0;
                            
                            var set_super = 0;
                            
                            var set_spec = 0;
                            
                            var union_super = 0;
                            
                            var set_union = 0;
                            
                            var remove_spec = 0;
                            
                            var remove_union = 0;
                            
                            var del_union_super = 0;
                            
                            var super_double = 0;
                            
                            var union_double = 0;
                            
                            var remove_super_toggle = 0;
                            
                            var def_attribute = 0;
                            
                            var set_criteria = 0;
                            
                            var del_criteria = 0;
                            
                            var del_def_attribute = 0;
                            
                            var startP, endP; 
                            
                             function setCriteria() {
                                
                                set_criteria = 1;                      
                                
                                
                            };
                            
                            function delCriteria() {
                                
                                del_criteria = 1;                      
                                
                                
                            };
                            
                            function defAttribute() {
                                
                                def_attribute = 1;                      
                                
                                
                            };
                            
                            function delDefAttribute() {
                                
                                del_def_attribute = 1;                      
                                
                                
                            };
                            
                            function setSuper(temp) {
                                
                                set_super = 1;   
                                
                                super_double = temp;
                                
                                
                            };
                            
                            function setUnion(temp) {
                                
                                set_union = 1;   
                                
                                union_double = temp;
                                
                                
                            };
                            
                            function delSpec() {
                                
                                remove_spec = 1;   
                                
                                
                            };
                            
                            function delUnion() {
                                
                                remove_union = 1;   
                                
                                
                            };
                            
                            
                            function setSpec() {
                                
                                set_spec = 1;                      
                                
                                
                            };
                            
                            function deleteSuper(){
                                
                                remove_super_toggle = 1;
                                
                            };
                            
                             function unionSuper() {
                                
                                union_super = 1;                      
                                
                                
                            };
                            
                            function deleteUnionSuper() {
                                
                                del_union_super = 1;                      
                                
                                
                            };
                            
                           function selectionChange(){
                               
                               
                               v = document.getElementById("data").value;
                               
                               if (v === "BIT"  || v === "BIT VARYING" || v === "CHARACTER" || v === "VARYING CHARACTER"){
                                   
                                   var str = prompt("Please enter a value for n: ");
                                   
                                   n_input = Math.floor(Number(str));                                  
                                   
                                   
                               }
                               
                               else if (v === "DECIMAL"){
                                   
                                   var str = prompt("Please enter a value for precision i:  ");
                                   
                                   i_input = Math.floor(Number(str));                                  
                                   
                                   var str = prompt("Please enter a value for scale j:  ");
                                   
                                   j_input = Math.floor(Number(str));
                                   
                               }
                               
                               
                           };
                            
                            function setData(){
                                
                                set_data = 1;
                                
                                 $("#myModal").modal();
                                
                            }
                            
                            
                            function cardinalityRatioOne(temp){
                                
                                ratio_edge = temp;      
                                change_ratio_to_one = 1;                                
                                
                            }
                           
                           function cardinalityRatioN(temp){
                                
                                ratio_edge = temp;      
                                change_ratio_to_N = 1;                                
                                
                            }
                            
                           
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
                              
                             
                               if((change_ratio_to_one === 1) && (this.type === "relationship" || this.type === "identifying_rel")){
                                   
                                   switch (ratio_edge){
                                     case 1:
                                         
                                        if( this.topLine !== 0){
                                          
                                            this.topLine.ratio = "1";                                                                               
                                            
                                        }
                                    break; 
                                
                                    case 2:
                                         
                                        if( this.botLine !== 0){
                                            
                                           this.botLine.ratio = "1";                                         
                                            
                                        }
                                    break;                              
                                     
                                     case 3:
                                         
                                         if( this.leftLine !== 0){
                                            
                                           this.leftLine.ratio = "1";  
                                           
                                        }
                                    break; 
                                
                                    case 4:
                                         
                                        if( this.rightLine !== 0){
                                          
                                             this.rightLine.ratio = "1";    
                                            
                                        }
                                        
                                    break;
                                        
                                        
                                    }
                                    
                                    ratio_edge = 0;
                                    change_ratio_to_one = 0;                     
                                   
                                   
                               }
                               
                               else if((change_ratio_to_N === 1) && (this.type === "relationship" || this.type === "identifying_rel")){
                                   
                                   switch (ratio_edge){
                                     case 1:
                                         
                                        if( this.topLine !== 0){
                                          
                                            this.topLine.ratio = "N";                                                                               
                                            
                                        }
                                    break; 
                                
                                    case 2:
                                         
                                        if( this.botLine !== 0){
                                            
                                           this.botLine.ratio = "N";                                         
                                            
                                        }
                                    break;                              
                                     
                                     case 3:
                                         
                                         if( this.leftLine !== 0){
                                            
                                           this.leftLine.ratio = "N";  
                                           
                                        }
                                    break; 
                                
                                    case 4:
                                         
                                        if( this.rightLine !== 0){
                                          
                                             this.rightLine.ratio = "N";    
                                            
                                        }
                                        
                                    break;
                                        
                                        
                                    }
                                    
                                    ratio_edge = 0;
                                    change_ratio_to_N = 0;                     
                                   
                                   
                               }
                             
                               else if ((remove_rel_connection === 1) && (this.type === "relationship" || this.type === "identifying_rel")){
                                   
                                   switch (target_edge){
                                     case 1:
                                         
                                        if( this.topLine !== 0){
                                            
                                            var indexE = this.topEntity.relationships.indexOf(this.topLine);  // remove old connection first
                                            this.topEntity.attributes.splice(indexE);  
                                            
                                            if(this.topLine.companion !== 0){                                             
                                              
                                                this.topLine.companion.remove();                                             
                                            }   
                                            
                                            this.topLine.text.remove();
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
                                            
                                            this.botLine.text.remove();
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
                                            
                                            this.leftLine.text.remove();
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
                                            
                                            this.rightLine.text.remove();
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
                                            
                                                this.attributes[i].start.owner = 0;  
                                                this.attributes[i].start.ownerLine = 0; 
                                                this.attributes[i].remove();                                                                             

                                        }
                                        
                                         for(i=0; i<this.unions.length; i++){        // set "sub" of all unions = 0
                                            
                                                this.unions[i].end.sub = 0;  
                                                this.unions[i].end.unionLine = 0;
                                                  
                                                
                                                 if(this.unions[i].companion !== 0){    // remove double line, if total particilation                                            
                                              
                                                     this.unions[i].companion.remove(); 
                                                     
                                                }   
                                                
                                                 this.unions[i].remove(); 

                                        }
                                        
                                         for(i=0; i<this.subs.length; i++){        // set "super" of all entities = 0
                                            
                                             
                                                this.subs[i].start.super = 0;
                                                this.subs[i].start.superLine = 0;  
                                                this.subs[i].remove();    
                                                
                                                

                                        }
                                        
                                        
                                         for(i=0; i<this.specializations.length; i++){        // set "super" of all specializations = 0
                                            
                                               
                                                    if(this.specializations[i].start.superLine.attribute !== 0){

                                                     this.specializations[i].start.superLine.text.remove();
                                                     this.specializations[i].start.superLine.attribute = 0;

                                                 }
                                                 
                                                 if(this.specializations[i].start.superLine.companion !== 0){

                                                     this.specializations[i].start.superLine.companion.remove();
                                                     this.specializations[i].start.superLine.companion = 0;

                                                 }
                                               
                                                this.specializations[i].start.super = 0; 
                                                this.specializations[i].start.superLine = 0;
                                                this.specializations[i].remove();    
                                                
                                                

                                        }
                                        
                                        for(i=0; i<this.super_specializations.length; i++){ 
                                            
                                            
                                                   var indexE = this.super_specializations[i].end.subs.indexOf(this.super_specializations[i]);  // find position of line within super's subclasses list
                                                   this.super_specializations[i].end.subs.splice(indexE); 
                                                   // remove element with that position from subclasses list    
                                                   if(this.super_specializations[i].criteria !== 0){
                                                

                                                        this.super_specializations[i].criteria = 0; 
                                                        this.super_specializations[i].text.remove();

                                                    }
                                                   
                                                   this.super_specializations[i].remove();                                                         
                                                   
                                                   

                                        }
                                        
                                        for(i=0; i<this.union_subs.length; i++){        
                                            
                                                   var indexE = this.union_subs[i].start.supers.indexOf(this.union_subs[i]);  // find position of line within super's subclasses list
                                                   this.union_subs[i].start.supers.splice(indexE);                         // remove element with that position from subclasses list                                   
                                                   this.union_subs[i].remove();                                                         

                                        }
                                        
                                        if( this.super !== 0){
                                            
                                            var indexE = this.super.subs.indexOf(this.superLine);  // find position of line within super's subclasses list
                                            this.super.subs.splice(indexE);                         // remove element with that position from subclasses list                                   
                                            this.superLine.remove();
                                            
                                        }   
                                        
                                        for(i=0; i<this.relationships.length; i++){ 
                                            
                                                if(this.relationships[i].start.topEntity === this){

                                                        this.relationships[i].start.topLine = 0;         
                                                        this.relationships[i].start.topEntity = 0; 


                                                    }
                                                    
                                                   if(this.relationships[i].start.botEntity === this){
                                                    
                                                    this.relationships[i].start.botLine = 0;         
                                                    this.relationships[i].start.botEntity = 0; 
                                                                                     
                                                    
                                                }
                                            
                                            
                                                if(this.relationships[i].start.leftEntity === this){
                                                    
                                                    this.relationships[i].start.leftLine = 0;         
                                                    this.relationships[i].start.leftEntity = 0; 
                                                                                     
                                                    
                                                }
                                                
                                                if(this.relationships[i].start.rightEntity === this){
                                                    
                                                    this.relationships[i].start.rightLine = 0;        
                                                    this.relationships[i].start.rightEntity = 0; 
                                                                                     
                                                    
                                                }
                                                
                                                if(this.relationships[i].companion !== 0){    // remove double line, if total particilation                                            
                                              
                                                     this.relationships[i].companion.remove(); 
                                                     
                                                }    
                                                
                                                this.relationships[i].text.remove();
                                                this.relationships[i].remove();                                                           

                                        }   
                                    
                                 }
                                 
                                 else if (this.type === "disjoint" || this.type === "overlapping"){
                                     
                                     if( this.super !== 0){
                                            
                                            var indexE = this.super.specializations.indexOf(this.superLine);  // find position of line within super's subclasses list
                                            this.super.specializations.splice(indexE);                         // remove element with that position from specializations list                                   
                                             
                                            if(this.superLine.companion !== 0){                                             
                                              
                                                this.superLine.companion.remove();                                             
                                            } 
                                            
                                            if(this.superLine.attribute !== 0){
                                                
                                                this.superLine.text.remove();
                                                this.superLine.attribute = 0;
                                                
                                            }    
                                         
                                            this.superLine.remove();
                                            
                                            
                                        }   
                                        
                                        for(i=0; i<this.subs.length; i++){        
                                            
                                                   var indexE = this.subs[i].start.super_specializations.indexOf(this.subs[i]);  // find position of line within super's subclasses list
                                                   this.subs[i].start.super_specializations.splice(indexE);                         // remove element with that position from subclasses list                                   
                                                   
                                                   if(this.subs[i].criteria !== 0){
                                                

                                                        this.subs[i].criteria = 0; 
                                                        this.subs[i].text.remove();

                                                    }
                                         
                                         
                                                    this.subs[i].remove();                                                         

                                        }
                                     
                                 }
                                 
                                 else if (this.type === "union"){
                                     
                                     if(this.sub !== 0){
                                         
                                         var indexE = this.sub.unions.indexOf(this.unionLine);  // find position of line within super's subclasses list
                                     this.sub.unions.splice(indexE);                         // remove element with that position from specializations list                                   
                                             
                                            if(this.unionLine.companion !== 0){                                             
                                              
                                                this.unionLine.companion.remove();                                             
                                            }   
                                         
                                            this.unionLine.remove();                      
                                         
                                     }
                                     
                                     for(i=0; i<this.supers.length; i++){        
                                            
                                                   var indexE = this.supers[i].end.union_subs.indexOf(this.supers[i]);  // find position of line within super's subclasses list
                                                   this.supers[i].end.union_subs.splice(indexE);                         // remove element with that position from subclasses list                                   
                                                   this.supers[i].remove();                                                         

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
                                         
                                         
                                            this.topLine.text.remove();
                                            this.topLine.remove();
                                            
                                        }  
                                        
                                        if( this.botEntity !== 0){
                                            
                                            var indexE = this.botEntity.relationships.indexOf(this.botLine);  // find position of line within owner's relationships list
                                            this.botEntity.relationships.splice(indexE);                         // remove element with that position from relationships list                                   
                                            
                                         if(this.botLine.companion !== 0){                                             
                                              
                                                this.botLine.companion.remove();                                             
                                         }        
                                         
                                            this.botLine.text.remove();
                                            this.botLine.remove();
                                            
                                        }        
                                        
                                        if( this.leftEntity !== 0){
                                            
                                            var indexE = this.leftEntity.relationships.indexOf(this.leftLine);  // find position of line within owner's relationships list
                                            this.leftEntity.relationships.splice(indexE);                         // remove element with that position from relationships list                                   
                                            
                                         if(this.leftLine.companion !== 0){                                             
                                              
                                                this.leftLine.companion.remove();
                                             
                                         }
                                        
                                            this.leftLine.text.remove();
                                            this.leftLine.remove();
                                            
                                        }    
                                        
                                        if( this.rightEntity !== 0){
                                            
                                            var indexE = this.rightEntity.relationships.indexOf(this.rightLine);  // find position of line within owner's relationships list
                                            this.rightEntity.relationships.splice(indexE);                         // remove element with that position from relationships list                                   
                                            
                                         if(this.rightLine.companion !== 0){                                             
                                              
                                                this.rightLine.companion.remove();                                             
                                         }      
                                         
                                            this.rightLine.text.remove();
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
                                
                                
                                
                                
                                
                                else if(primary_toggle === 1 && (this.type === "attribute" || this.type === "derived_attribute" || this.type === "multi_attribute")){                                                           
                                    
                                    
                                    if( this.owner !== 0){                                     
                                        
                                        
                                       var size = this.owner.attributes.length;
                                       
                                       
                                       for(i=0; i<size; i++){        // set other attributes of the same owner as "non primary"
                                            
                                            this.owner.attributes[i].start.primary = false;                                                                                                      

                                        }                                   
                                    }                            
                                    
                                    this.primary = true;                        

                                    primary_toggle = 0;                               
                                    
                                }
                                
                                
                                    else if(set_data === 1 && (this.type === "attribute" || this.type === "derived_attribute" || this.type === "multi_attribute")){                                                           
                                    
                                    if (v === "BIT" || v === "BIT VARYING" || v === "CHARACTER" || v === "VARYING CHARACTER"){
                                   
                                        this.n = n_input;
                                   
                                    }
                                    
                                    else if (v === "DECIMAL") {
                                        
                                        this.i = i_input;
                                        this.j = j_input;                                        
                                        
                                    }
                                    
                                    this.dataT = v; 
                                    
                                   
                                    set_data = 0;   
                                    n_input = 1;                                           
                                    i_input, j_input = 0;
                                    
                                }                             
                                
                                
                                else if(neg_primary_toggle === 1 && (this.type === "attribute" || this.type === "derived_attribute" || this.type === "multi_attribute")){                             
                                    
                                    this.primary = false;                        

                                    neg_primary_toggle = 0;                               
                                    
                                }
                                
                                else if(unique_toggle === 1 && (this.type === "attribute" || this.type === "derived_attribute" || this.type === "multi_attribute")){                             
                                    
                                    this.unique = true;                        

                                    unique_toggle = 0;                               
                                    
                                }
                                
                                else if(neg_unique_toggle === 1 && (this.type === "attribute" || this.type === "derived_attribute" || this.type === "multi_attribute")){                             
                                    
                                    this.unique = false;                        

                                    neg_unique_toggle = 0;                               
                                    
                                }
                                
                                else if (not_null_toggle === 1 && (this.type === "attribute" || this.type === "derived_attribute" || this.type === "multi_attribute")){
                                    
                                    this.notNull = true;
                                    
                                    not_null_toggle = 0;
                                    
                                    
                                }
                                
                                
                                else if(rename_toggle === 1 && this.type !== "disjoint" && this.type !== "overlapping" && this.type !== "union"){
                                    
                                 var str = prompt("Please enter a name.", "Undefined"); 
                                 
                                 if (str == null) {
                                     
                                     str = "Undefined";
                                        
                                 }
                                 
                                  str = str.replace(/ /g,"_");
                                 
                                 
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
                                    
                                    remove_owner_toggle = 0;
                                     
                                     
                                 }
                                 
                                 // ENTITY SUPERCLASS-SUBCLASS  //
                                 
                                 else if(set_super === 1 && (this.type === "entity" || this.type === "weak_entity" || this.type === "disjoint" || this.type === "overlapping")){
                                  
                                    if( this.super !== 0){
                                        
                                        if(this.type === "entity" || this.type === "weak_entity" ){
                                    
                                            var indexE = this.super.subs.indexOf(this.superLine);  // remove old owner first
                                            this.super.subs.splice(indexE);                                                   
                                    
                                        }
                                  
                                    else {                              

                                            var indexE = this.super.specializations.indexOf(this.superLine);  // remove old owner first
                                            this.super.specializations.splice(indexE);  
                                            
                                            if(this.superLine.companion !== 0){                                             
                                              
                                                this.superLine.companion.remove();                                             
                                            }   
                                      
                                   }                                     
                                            if(this.superLine.attribute !== 0){
                                                
                                                this.superLine.text.remove();
                                                this.superLine.attribute = 0;
                                                
                                            }       
                                            
                                            this.superLine.remove();
                                            this.super = 0;                                             
                                            
                                        }                                        
                                 
                                 // make this shape a start point                                   
                                    L.start = this;                                    
                                   // console.log("START " + L.start.cx + ", " + L.start.cy);
                                    set_super = 2;                                       
                                 }                         
                                
                                
                                else if ((set_super === 2)  && (L.start !== this) && (this.type === "entity" || this.type === "weak_entity") && (L.start.super !== this) ){ // make this shape an end point
                                   
                                  L.end = this;
                                  // console.log("END " + L.end.cx + ", " + L.end.cy);
                                  set_super = 0; 
                                  
                                  if(L.start.type === "entity" || L.start.type === "weak_entity" ){
                                      
                                    var arrow = lsvg.path("M6,10 Q3,0 0,10").attr({stroke: '#000', fill:"none" }).transform('r270');


                                    //var arrow = lsvg.text(2,0,"U");
                                    var marker = arrow.marker(0,0, 10,35, -20,7);

                                    var LLocal = lsvg.line(0,0,0,0).attr({
                                      stroke: "#000",
                                      strokeWidth: 2,
                                      markerStart: marker

                                    });    
                                    
                                     LLocal.companion = 0;
                                     LLocal.attribute = 0;
                                      
                                  }
                                  
                                  else { 
                                      
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
                                      
                                      LLocal.attribute = 0;     // defining attribute
                                      
                                      var t1 = lsvg.text(0, 0, LLocal.attribute);
                                      LLocal.text = t1;

                                    
                                  }                                  
                                 
                                  
                                  
                                  
                                  LLocal.start = L.start;
                                  LLocal.end = L.end; 
                                  
                                  
                                  LLocal.start.super = this;    // udate attribute owner 
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
                                 
                                   if(LLocal.attribute !== 0){   
                                     
                                     
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
                                
                                // REMOVE DEFINING ATTRIBUTE //
                                
                                else if (del_def_attribute ===1 && (this.type === "disjoint" || this.type === "overlapping")){
                                    
                                    if(this.superLine.attribute !== 0){
                                                
                                                this.superLine.text.remove();
                                                this.superLine.attribute = 0;
                                                
                                            }
                                            
                                            del_def_attribute = 0;
                                    
                                    
                                }
                                
                                // REMOVE SUPERCLASS //
                                
                                else if(remove_super_toggle === 1){
                                     
                                     if(this.type === "entity" || this.type === "weak_entity"){                                     
                                                                     
                                        if( this.super !== 0){
                                            
                                            var indexE = this.super.subs.indexOf(this.superLine);  // find position of line within owner's attributes list
                                            this.super.subs.splice(indexE);                         // remove element with that position from attributes list                                   
                                            this.superLine.remove();
                                            
                                        } 
                                        
                                        this.super = 0;
                                        this.superLine.remove();                                         
                                     
                                    }  
                                    
                                    else if(this.type === "disjoint" || this.type === "overlapping"){                                     
                                                                     
                                        if( this.super !== 0){
                                            
                                            var indexE = this.super.specializations.indexOf(this.superLine);  // find position of line within owner's attributes list
                                            this.super.specializations.splice(indexE);                         // remove element with that position from attributes list                                   
                                            
                                             if(this.superLine.companion !== 0){                                             
                                              
                                                this.superLine.companion.remove();                                             
                                            }   
                                         
                                           if(this.superLine.attribute !== 0){
                                                
                                                this.superLine.text.remove();
                                                this.superLine.attribute = 0;
                                                
                                            }
                                         
                                            this.superLine.remove();
                                            
                                        } 
                                        
                                        this.super = 0;
                                        this.superLine.remove();                                         
                                     
                                    }          
                                     
                                 remove_super_toggle = 0;  
                                 
                                 }
                                 
                                 // UNION SUB //
                                 
                                    else if(set_union === 1 && (this.type === "entity" || this.type === "weak_entity")){                  
                                 
                                                                   
                                    L.start = this;                                    
                                   
                                    set_union = 2;                                       
                                 }                         
                                
                                
                                else if ((set_union === 2) && (this.type === "union") ){ // make this shape an end point
                                   
                                  L.end = this;
                                  
                                  set_union = 0;     
                                  
                                  if (this.sub !== 0){
                                      
                                      var indexE = this.sub.unions.indexOf(this.unionLine);  // remove old owner first
                                      this.sub.unions.splice(indexE);  
                                      
                                      if(this.unionLine.companion !== 0){
                                          
                                          this.unionLine.companion.remove();
                                          
                                      }
                                      
                                      this.unionLine.remove();
                                      this.sub = 0;                                      
                                      
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
                                      
                                      super_double = 0;                      


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

                                 
                                
                                    
                                }
                                
                                // REMOVE UNION SUB //
                                
                                 else if(remove_union === 1 && (this.type === "entity" || this.type === "weak_entity")){
                                  
                                                           
                                 
                                                                    
                                    L.start = this;                                    
                                   
                                    remove_union = 2;     
                                    
                                    
                                 }                         
                                
                                
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
                                            L.start.unions.splice(indexE);                                 
                                           
                                            
                                            if(L.end.unionLine.companion !==0){
                                                
                                                L.end.unionLine.companion.remove();
                                            }
                                            
                                             L.end.sub = 0;    // union does not have a sub anymore
                                             L.end.unionLine = 0;
                                            
                                           temp_line.remove(); // delete line
                                            
                                    
                                }
                                
                             }
                             
                             // UNION SUPER //
                             
                                 else if(union_super === 1 && (this.type === "union")){
                                  
                                                           
                                 
                                 // make this shape a start point                                   
                                    L.start = this;                                    
                                   // console.log("START " + L.start.cx + ", " + L.start.cy);
                                    union_super = 2;                                       
                                 }                         
                                
                                
                                else if ((union_super === 2) && (this.type === "entity" || this.type === "weak_entity") ){ // make this shape an end point
                                   
                                  L.end = this;
                                  // console.log("END " + L.end.cx + ", " + L.end.cy);
                                  union_super = 0; 
                                  
                                  var flag = 0; // check if this line already exists
                                  
                                  for(i=0; i<L.start.supers.length; i++){
                                      
                                      if(L.start.supers[i].end === this){
                                          
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
                                
                                    
                                }
                                
                                // REMOVE UNION SUPER //
                                
                                 else if(del_union_super === 1 && (this.type === "union")){                                               
                                 
                                                                    
                                    L.start = this;                                    
                                   
                                    del_union_super  = 2;     
                                    
                                    
                                 }                         
                                
                                
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
                                            L.start.supers.splice(indexE);                                  
                                            
                                            
                                            indexE = L.end.union_subs.indexOf(temp_line);  // remove line from specialization's list
                                            L.end.union_subs.splice(indexE);
                                            
                                           temp_line.remove(); // delete line
                                            
                                    
                                }
                                
                             }                                
                                 
                                 // DEFINING ATTRIBUTE //
                                 
                                 else if(def_attribute === 1 && (this.type === "disjoint" || this.type === "overlapping")){
                                     
                                     var attr_list = [];
                                     var temp = " ";
                                     
                                     if(this.super !== 0){
                                         
                                         attr_list = this.super.attributes;
                                         
                                         for(i=0; i<this.super.attributes.length; i++){    // get each one of the attributes
                                            alert(this.super.attributes[i].start.name); 
                                            temp = temp + "  " + '"' + this.super.attributes[i].start.name + '"'; 
                                             
                                             
                                         }
                                         
                                         var string = prompt("Please enter one of the following attributes:" + temp, "Undefined");  // ask for name
                                         string = string.replace(/ /g,"_");
                                         
                                            if(string !== null){

                                                this.superLine.attribute = string;

                                            }
                                         
                                     }
                                     
                                     
                                     
                                     def_attribute = 0;
                                 }
                                 
                                 // SPECIALIZATION  //
                                 
                                 else if(set_spec === 1 && (this.type === "entity" || this.type === "weak_entity")){
                                  
                                                           
                                 
                                 // make this shape a start point                                   
                                    L.start = this;                                    
                                   // console.log("START " + L.start.cx + ", " + L.start.cy);
                                    set_spec = 2;                                       
                                 }                         
                                
                                
                                else if ((set_spec === 2) && (this.type === "disjoint" || this.type === "overlapping") ){ // make this shape an end point
                                   
                                  L.end = this;
                                  // console.log("END " + L.end.cx + ", " + L.end.cy);
                                  set_spec = 0; 
                                  
                                  var flag = 0; // check if this line already exists
                                  
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
                                      
                                      LLocal.criteria = 0;
                                      var t1 = lsvg.text(0, 0, LLocal.criteria);
                                      LLocal.text = t1;


                                      LLocal.start.super_specializations.push(LLocal);   // add line to list of super specializations  of start point



                                      LLocal.end.subs.push(LLocal);   // add line to list of subs  of end point


                                     document.addEventListener('mousemove', function (e) {

                                     startP = LLocal.start.getBBox();  
                                     endP = LLocal.end.getBBox();                                 
                                     
                                     if(LLocal.criteria != 0){
                                         
                                          
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
                                
                                    
                                }
                                
                                // REMOVE SPECIALIZATION //
                                
                                else if(remove_spec === 1 && (this.type === "entity" || this.type === "weak_entity")){
                                  
                                                           
                                 
                                                                    
                                    L.start = this;                                    
                                   
                                    remove_spec = 2;     
                                    
                                    
                                 }                         
                                
                                
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
                                            L.start.super_specializations.splice(indexE);                                  
                                            
                                            
                                            indexE = L.end.subs.indexOf(temp_line);  // remove line from specialization's list
                                            L.end.subs.splice(indexE);
                                            
                                            if(temp_line.criteria !== 0){
                                                
                                                   
                                                temp_line.criteria = 0; 
                                                temp_line.text.remove();
                                                
                                            }
                                            
                                           temp_line.remove(); // delete line
                                            
                                    
                                }
                                
                             }
                             
                             
                                // SET CRITERIA //
                                
                                else if(set_criteria === 1 && (this.type === "entity" || this.type === "weak_entity")){
                                  
                                                           
                                 
                                                                    
                                    L.start = this;                                    
                                   
                                    set_criteria = 2;     
                                    
                                    
                                 }                         
                                
                                
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
                                      
                                      var string = prompt("Please enter an attribute value.", "Undefined");  // ask for name
                            
                                        if (string == null) {

                                                 string = "Undefined";

                                             }

                                        string = string.replace(/ /g,"_");  
                                        
                                      L.start.super_specializations[i].criteria = string;     
                                            
                                    
                                }
                                
                             }
                                
                                
                                
                                // REMOVE CRITERIA //
                                
                                else if(del_criteria === 1 && (this.type === "entity" || this.type === "weak_entity")){
                                  
                                                           
                                 
                                                                    
                                    L.start = this;                                    
                                   
                                    del_criteria = 2;     
                                    
                                    
                                 }                         
                                
                                
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
                                  
                                   
                                 
                                  if(flag === 1){  // if a line between them exists, set criteria 
                                      
                                        
                                      L.start.super_specializations[i].criteria = 0; 
                                      L.start.super_specializations[i].text.remove();
                                            
                                    
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
                                            
                                            this.topLine.text.remove();
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
                                            
                                            this.botLine.text.remove();
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
                                            
                                            this.leftLine.text.remove();
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
                                            
                                            this.rightLine.text.remove();
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
                                  LLocal.ratio = "1";
                                  
                                  
                                 startP = LLocal.start.getBBox();  
                                 
                                  
                                 var ratio = lsvg.text(startP.cx, startP.cy, LLocal.ratio);
                                 
                                 LLocal.text = ratio;
                                  
                                  
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
                                            
                                            this.topLine.text.remove();
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
                                            
                                            this.botLine.text.remove();
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
                                            
                                            this.leftLine.text.remove();
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
                                            
                                            this.rightLine.text.remove();
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
                                  LLocal.ratio = "1";
                                  
                                  
                                 startP = LLocal.start.getBBox();                                  
                                  
                                 var ratio = lsvg.text(startP.cx, startP.cy, LLocal.ratio);
                                 
                                 LLocal.text = ratio;                                
                                  
                                  
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
                                
                                
                                    
                                }    
                                
                                
                               
                            
                            };                 
                            
                          
                            
                             
                        
                        