
                       
                          
                          function createRect(rect_type){     
                              
                            var string = prompt("Please enter a name for this Entity.", "Undefined");  // ask for name
                              
                            var r = Snap('#svg');
                            
                            if(rect_type === "entity"){                            
                            
                                var newRect = r.rect(100,100,110,55);
                                newRect.attr({                            
                                    fill:'#afe5ff',
                                    stroke:'#000',
                                    strokeWidth: 2
                                });                     
                            
                            }                     
                            
                            else if (rect_type === "weak_entity"){
                                    
                                var outerBorder = r.rect(100,100,110,55);
                                outerBorder.attr({                            
                                    fill:'#afe5ff',
                                    stroke:'#000',
                                    strokeWidth: 2
                                });                                           
                                
                                var innerBorder = r.rect(107,105,96,45);
                                innerBorder.attr({                              
                                    fill:'#afe5ff',
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
                                    
                            newRect.children = [];     // list of  lines connected to this shape    
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
                            
                            
                            newEllipse.children = [];            // list of  lines connected to this shape
                            newEllipse.type = ell_type;          // type
                            newEllipse.owner = 0;            // owner
                            newEllipse.ownerLine = 0;        // line connecting to owner
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
                                                                                     
                                    t1.attr({                                
                                        text: newEllipse.name,                               
                                        textAnchor: "middle",
                                        x: pos.cx,
                                        y: pos.cy                                 
                                      });              
                
                                }, false);   
                         };                 
                         
                         
                         
                         
                         function createRhombus(){
                            var r = Snap('#svg');
                            var newRhombus = r.rect(1020,80,70,70);
                            newRhombus.attr({                            
                                fill:'#ffffff',
                                stroke:'#000',
                                strokeWidth: 2
                            });   
                            
                            newRhombus.lineList = [];             // list of  lines connected to this shape
                            newRhombus.transform( 'r45,1020,80' );      
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
                
                                }, false);   
                         }; 
                         
                           
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
                            //console.log("start");
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
                              
                           
                            
                            function deleteElement() {
                                
                                 del = 1;                                 
                                
                            };
                            
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
                                
                               
                                if (del === 1){ 
                                    
                                    // we need to remove the connecting line from the other point as well
                                    // figure whether the "target" shape is a start or an end point
                                    
                                    if(this.type === "entity" || this.type === "weak_entity" ){    
                                                                
                                    
                                        for(i=0; i<this.children.length; i++){        // set "owner" of all children = 0
                                            
                                                this.children[i].start.owner = 0;         // start point of the line will always be the child
                                                this.children[i].remove();                // remove line                                                               

                                        }   
                                    
                                 }
                                 
                                 else if(this.type === "attribute" || this.type === "derived_attribute" || this.type === "multi_attribute"){                                     
                                     
                                     
                                     for(i=0; i<this.children.length; i++){        // set "owner" of all children = 0
                                            
                                                this.children[i].start.owner = 0;         // start point of the line will always be the child 
                                                this.children[i].remove();                // remove line                                                               

                                        }
                                        
                                        if( this.owner != 0){
                                            
                                            var indexE = this.owner.children.indexOf(this.ownerLine);  // find position of line within owner's children list
                                            this.owner.children.splice(indexE);                         // remove element with that position from children list                                   
                                            this.ownerLine.remove();
                                            
                                        }                                
                                         
                                     
                                 }
                                   
                                    del = 0;
                                    
                                    this.remove();                                // remove target  
                                    
                                }  
                                
                                if(rename_toggle === 1){
                                    
                                 var str = prompt("Please enter a name.", "Undefined"); 
                                 
                                 this.name = str;
                                 
                                 rename_toggle = 0;                               
                                    
                                }
                                
                                 var startP, endP;                         
                           
                                
                                if ((line_cr === 1) && (this.type === "attribute" || this.type === "derived_attribute" || this.type === "multi_attribute")){  
                                    
                                   if (this.owner === 0){   
                                       
                                       //alert(this.owner.name);
                                   
                                 // make this shape a start point                                   
                                    L.start = this;                                    
                                   // console.log("START " + L.start.cx + ", " + L.start.cy);
                                    line_cr = 2;                                       
                                 }
                                 
                                 else{
                                     
                                     alert("This attribute already has an owner!")  
                                     line_cr = 0;
                                     
                                 }
                                    
                                }
                                
                                else if ((line_cr === 2)  && (L.start != this)){ // make this shape an end point
                                   
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
                                  LLocal.end.children.push(LLocal);   // add line to list of children  of end point                              
                                  
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
                            

                        
                        