
                        
                        // SAVING & LOADING //
                        
                        $(function() 
                        {
                          console.log( "ready!" );
                          // Check for the various File API support.
                          if (window.File && window.FileReader && window.FileList && window.Blob) 
                          {
                            //alert("This browser supports file loading...");
                            $('#load-text-file').change(function(evt){ return handleFileSelect(evt, $('#textInput')); } );
                            $('#load-html-file').change(function(evt){ return handleFileSelect(evt, $('#htmlInput')); } );
                          } 
                          else 
                          {
                            alert('The File APIs are not fully supported in this browser.');
                          }
                        }
                       );

                      function saveText(ref, fname, text, mime)
                      {
                        var blob = new Blob([text], {type: mime});
                        saveAs(blob, fname);

                        return false;
                      }


                      function handleFileSelect(evt, target) 
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
                      
                      var x = xmlDoc.getElementsByTagName("entity");
                         
                            for (i = 0; i <x.length; i++) {   // get data for each entity node
                                  
                                var ent_type = xmlDoc.getElementsByTagName("type")[i].childNodes[0].nodeValue;

                                var ent_name = xmlDoc.getElementsByTagName("name")[i].childNodes[0].nodeValue;
                                
                                var ent_x = xmlDoc.getElementsByTagName("x")[i].childNodes[0].nodeValue;
                                
                                ent_x = Math.floor(Number(ent_x));
                           
                                var ent_y = xmlDoc.getElementsByTagName("y")[i].childNodes[0].nodeValue;
                                
                                ent_y = Math.floor(Number(ent_y));

                                createRect(ent_type, ent_name, ent_x, ent_y);  
                      
                              }          
                              
                      x = xmlDoc.getElementsByTagName("attribute");
                         
                            for (i = 0; i <x.length; i++) {   // get data for each entity node
                                  
                                var attr_type = xmlDoc.getElementsByTagName("a-type")[i].childNodes[0].nodeValue;
                                
                                var attr_name = xmlDoc.getElementsByTagName("a-name")[i].childNodes[0].nodeValue;
                                
                                var attr_x = xmlDoc.getElementsByTagName("a-x")[i].childNodes[0].nodeValue;
                                
                                attr_x = Math.floor(Number(attr_x));
                           
                                var attr_y = xmlDoc.getElementsByTagName("a-y")[i].childNodes[0].nodeValue;
                                
                                attr_y = Math.floor(Number(attr_y));
                                
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
                                

                                createEllipse(attr_type, attr_name, attr_data, attr_n, attr_i, attr_j, attr_primary, attr_unique, attr_notnull, attr_x, attr_y);  
                      
                              }   
                              
                            x = xmlDoc.getElementsByTagName("relationship");
                         
                            for (i = 0; i <x.length; i++) {   // get data for each entity node
                                  
                                var rel_type = xmlDoc.getElementsByTagName("r-type")[i].childNodes[0].nodeValue;

                                var rel_name = xmlDoc.getElementsByTagName("r-name")[i].childNodes[0].nodeValue;
                                
                                var rel_x = xmlDoc.getElementsByTagName("r-x")[i].childNodes[0].nodeValue;
                                
                                rel_x = Math.floor(Number(rel_x));
                           
                                var rel_y = xmlDoc.getElementsByTagName("r-y")[i].childNodes[0].nodeValue;
                                
                                rel_y = Math.floor(Number(rel_y));

                                createRhombus(rel_type, rel_name, rel_x, rel_y);  
                      
                              }       
                              
                               x = xmlDoc.getElementsByTagName("specialization-union");
                         
                            for (i = 0; i <x.length; i++) {   // get data for each entity node
                                  
                                var su_type = xmlDoc.getElementsByTagName("su-type")[i].childNodes[0].nodeValue;

                                
                                
                                var su_x = xmlDoc.getElementsByTagName("su-x")[i].childNodes[0].nodeValue;
                                
                                su_x = Math.floor(Number(su_x));
                           
                                var su_y = xmlDoc.getElementsByTagName("su-y")[i].childNodes[0].nodeValue;
                                
                                su_y = Math.floor(Number(su_y));

                                createCircle(su_type, su_x, su_y);  
                      
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
                    
                    for(i=0; i<globalEntities.length; i++ ){
                        
                        var bbox = globalEntities[i].getBBox();
                        
                        txt2 = txt2 + "<entity>" + "<name>" + globalEntities[i].name + "</name>" + "<type>" + globalEntities[i].type + "</type>" + "<x>" + bbox.x + "</x>" + "<y>" + bbox.y + "</y>" + "</entity>";
                       
                    }
                    
                     for(i=0; i<globalAttributes.length; i++ ){
                        
                        var bbox = globalAttributes[i].getBBox();
                        
                        txt3 = txt3 + "<attribute>" + "<a-name>" + globalAttributes[i].name + "</a-name>" + "<a-type>" + globalAttributes[i].type + "</a-type>" + "<a-data>" + globalAttributes[i].dataT + "</a-data>" + "<a-n>" + 
                        globalAttributes[i].n + "</a-n>" + "<a-i>" + globalAttributes[i].i + "</a-i>" +  "<a-j>" + globalAttributes[i].j  + "</a-j>" +  "<a-primary>" + globalAttributes[i].primary + "</a-primary>" + "<a-unique>" + 
                        globalAttributes[i].unique + "</a-unique>" + "<a-notnull>" + globalAttributes[i].notNull + "</a-notnull>" + "<a-x>" + bbox.cx + "</a-x>" + "<a-y>" + bbox.cy + "</a-y>" + "</attribute>";
                        
                       
                    }
                    
                    for(i=0; i<globalRelationships.length; i++ ){
                        
                        var bbox = globalRelationships[i].getBBox();
                        
                        txt4 = txt4 + "<relationship>" + "<r-name>" + globalRelationships[i].name + "</r-name>" + "<r-type>" + globalRelationships[i].type + "</r-type>" + "<r-x>" + bbox.x + "</r-x>" + "<r-y>" + bbox.y + "</r-y>" + "</relationship>";
                        
                       
                    }
                    
                    for(i=0; i<globalSpecs_Unions.length; i++ ){
                        
                        var bbox = globalSpecs_Unions[i].getBBox();
                        
                        txt5 = txt5 + "<specialization-union>" + "<su-type>" + globalSpecs_Unions[i].type + "</su-type>" + "<su-x>" + bbox.cx + "</su-x>" + "<su-y>" + bbox.cy + "</su-y>" + "</specialization-union>";
                        
                       
                    }
                    
                
                
                
                    var txt = txt1 + txt2 + txt3 + txt4 + txt5 + "</diagram>";
                    return saveText(this, 'test', txt , 'text/plain;charset=utf-8');
                    
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
                
               
                

                            // DIAGRAM GRAPHICS //


                            // Get height & width of container //


                            var divHeight = document.getElementById('drawing-box').clientHeight;
                           

                            var divWidth = document.getElementById('drawing-box').clientWidth;
                            
                            
                            basic_y = Math.floor(divHeight/2) - 30;
                            basic_x = Math.floor(divWidth/2) - 100;
                            
                            var entity_counter = 0;
                            var globalEntities = [];
                            
                            var attribute_counter = 0;
                            var globalAttributes = [];
                            
                            var relationship_counter = 0;
                            var globalRelationships = [];
                            
                            var globalSpecs_Unions = [];
                            
                           
                          
                          function createRect(rect_type, rect_name, rx, ry){  
                              
                            var r = Snap('#svg');
                            
                            entity_counter++; 
                            
                            if(rect_type === "entity"){                            
                            
                                var newRect = r.rect(rx,ry,110,55);
                                newRect.attr({                                   
                                    fill:'#ccffe6',
                                    stroke:'#000',
                                    strokeWidth: 2
                                });                     
                            
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
                                      
                              }
                              
                             
                             newRect.attr({
                                
                             id: "entity"
                             
                            })          
                          
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
                            globalEntities.push(newRect);
                            newRect.click( this.clickTrigger );                            
                            newRect.dblclick( addHandleFunc ); // start scaling upon double click                     
                            newRect.drag(); // use default drag() once shape is made 
                             
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
                          
                          
                          function createCircle(c_type, x, y){                    
                             
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
                            newCircle.superLine = 0;        // line connecting to owner
                            newCircle.subs = [];          // subclasses
                            newCircle.supers = [];       // superclasses
                            
                            // for unions
                            
                            newCircle.sub = 0;
                            newCircle.unionLine = 0;      // allows union to only have one subclass
                            
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
                         
                 
                         
                         
                         
                         function createEllipse(ell_type, ell_name, data, n, i, j, primary, unique, notnull, x, y){                    
                           
                             
                            var e = Snap('#svg');
                            
                            attribute_counter++;
                            
                            if(ell_type === "attribute"){
                                
                                var newEllipse = e.ellipse(x,y,60,25);
                                newEllipse.attr({                            
                                    fill:'#ccdaff',
                                    stroke:'#000',
                                    strokeWidth: 2
                                });                    
                            
                             }
                            
                            else if (ell_type === "derived_attribute"){
                                
                                var newEllipse = e.ellipse(x,y,60,25);
                                newEllipse.attr({                            
                                    fill:'#ccdaff',
                                    stroke:'#000',
                                    strokeDasharray: 10,
                                    strokeWidth: 2
                                   
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
                                
                                
                            }           
                            
                            newEllipse.attr({
                                
                             id: "attribute"
                             
                            })  
                             
                             newEllipse.name = ell_name;
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
                            newEllipse.primary = (primary === "true");
                            newEllipse.unique = (unique === "true");
                            newEllipse.notNull = (notnull === "true");
                            globalAttributes.push(newEllipse);
                            newEllipse.click( this.clickTrigger );
                            newEllipse.dblclick( addHandleFunc ); // start scaling upon double click
                            newEllipse.drag();   
                            
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
                                                 
                         
                         
                         function createRhombus(rhombus_type, rhombus_name, x, y){                            
                             
                            var r = Snap('#svg');
                            
                            relationship_counter ++;
                            
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
                            
                            newRhombus.leftEntity = 0;    
                            newRhombus.rightEntity = 0;
                            newRhombus.topEntity = 0; 
                            newRhombus.botEntity = 0;
                            
                            newRhombus.type = rhombus_type;                         
                            globalRelationships.push(newRhombus);
                            newRhombus.click( this.clickTrigger );
                            newRhombus.dblclick( addHandleFunc ); // start scaling upon double click
                            newRhombus.drag();    
                            
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
                                
                         function clickTrigger () {                         
                                
                                 // ENTITY SUPERCLASS-SUBCLASS  //
                                                         
                                
                                
                                if ((set_super === 2)  && (L.start !== this) && (this.type === "entity" || this.type === "weak_entity") && (L.start.super !== this) ){ // make this shape an end point
                                   
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
                                     LLocal.attribute = "";
                                      
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
                                      
                                      LLocal.attribute = "";     // defining attribute
                                      
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
                                
                                
                               
                                 
                                 // UNION SUB //
                                 
                               
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
                                 
                                 
                                 
                                 // SPECIALIZATION  //
                                 
                               
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
                                      
                                      LLocal.criteria = "";
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
                                            L.start.super_specializations.splice(indexE);                                  
                                            
                                            
                                            indexE = L.end.subs.indexOf(temp_line);  // remove line from specialization's list
                                            L.end.subs.splice(indexE);
                                            
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
                                          
                                    
                                }
                                
                             }
                                    
                                 
                                 // ATTRIBUTE LINES //                                   
                                
                                
                                else if ((line_cr === 2)  && (L.start !== this)){ // make this shape an end point
                                   
                                  L.end = this;
                                  // console.log("END " + L.end.cx + ", " + L.end.cy);
                                  line_cr = 0; 
                                  
                                  var LLocal = lsvg.line(0,0,0,0).attr({
                                    stroke: "#000",
                                    strokeWidth: 2
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
                                                  Snap(this[0]).super.subs.splice(indexE);                                                   

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
                                                Snap(this[0]).super.subs.splice(indexE);                         // remove element with that position from attributes list                                   
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
                                                  
                                                
                                                 if(Snap(this[0]).unions[i].companion !== 0){    // remove double line, if total particilation                                            
                                              
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
                                                   Snap(this[0]).super_specializations[i].end.subs.splice(indexE); 
                                                   // remove element with that position from subclasses list    
                                                   if(Snap(this[0]).super_specializations[i].criteria !== ""){
                                                

                                                        Snap(this[0]).super_specializations[i].criteria = ""; 
                                                        Snap(this[0]).super_specializations[i].text.remove();

                                                    }
                                                   
                                                   Snap(this[0]).super_specializations[i].remove();                                                         
                                                   
                                                   

                                        }
                                        
                                        for(i=0; i<Snap(this[0]).union_subs.length; i++){        
                                            
                                                   var indexE = Snap(this[0]).union_subs[i].start.supers.indexOf(Snap(this[0]).union_subs[i]);  // find position of line within super's subclasses list
                                                   Snap(this[0]).union_subs[i].start.supers.splice(indexE);                                    // remove element with that position from subclasses list                                   
                                                   Snap(this[0]).union_subs[i].remove();                                                         

                                        }
                                        
                                        if( Snap(this[0]).super !== 0){
                                            
                                            var indexE = Snap(this[0]).super.subs.indexOf(Snap(this[0]).superLine);  // find position of line within super's subclasses list
                                            Snap(this[0]).super.subs.splice(indexE);                                 // remove element with that position from subclasses list                                   
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
                                        
                                        var indexE = globalEntities.indexOf(Snap(this[0]));  // remove from global list
                                        globalEntities.splice(indexE);  
                                        
                                        Snap(this[0]).text.remove();                             // remove name
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
                                            Snap(this[0]).topEntity.attributes.splice(indexE);  
                                            
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
                                            Snap(this[0]).topEntity.attributes.splice(indexE);  
                                            
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
                                            Snap(this[0]).topEntity.attributes.splice(indexE);  
                                            
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
                                            
                                    }
                                },    
                                
                                "bottom": {
                                        "name": "Bottom", 
                                        "items": {
                                            "bot-key1": {"name": "Set (Partial)",
                                         callback: function(key, opt) {
                                             
                                              if( Snap(this[0]).botLine !== 0){
                                            
                                            var indexE = Snap(this[0]).botEntity.relationships.indexOf(Snap(this[0]).botLine);  // remove old connection first
                                            Snap(this[0]).botEntity.attributes.splice(indexE);  
                                            
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
                                            Snap(this[0]).botEntity.attributes.splice(indexE);  
                                            
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
                                            Snap(this[0]).botEntity.attributes.splice(indexE);  
                                            
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
                                            
                                    }
                                },
                                
                                "left": {
                                        "name": "Left", 
                                        "items": {
                                            "left-key1": {"name": "Set (Partial)",
                                         callback: function(key, opt) {
                                             
                                              if( Snap(this[0]).leftLine !== 0){
                                            
                                            var indexE = Snap(this[0]).leftEntity.relationships.indexOf(Snap(this[0]).leftLine);  // remove old connection first
                                            Snap(this[0]).leftEntity.attributes.splice(indexE);  
                                            
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
                                            Snap(this[0]).leftEntity.attributes.splice(indexE);  
                                            
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
                                            Snap(this[0]).leftEntity.attributes.splice(indexE);  
                                            
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
                                            
                                    }
                                },
                                
                                 "right": {
                                        "name": "Right", 
                                        "items": {
                                            "right-key1": {"name": "Set (Partial)",
                                         callback: function(key, opt) {
                                             
                                              if( Snap(this[0]).rightLine !== 0){
                                            
                                            var indexE = Snap(this[0]).rightEntity.relationships.indexOf(Snap(this[0]).rightLine);  // remove old connection first
                                            Snap(this[0]).rightEntity.attributes.splice(indexE);  
                                            
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
                                            Snap(this[0]).rightEntity.attributes.splice(indexE);  
                                            
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
                                            Snap(this[0]).rightEntity.attributes.splice(indexE);  
                                            
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
                                            Snap(this[0]).topEntity.relationships.splice(indexE);                         // remove element with that position from relationships list                                   
                                            
                                         if(Snap(this[0]).topLine.companion !== 0){                                             
                                              
                                                Snap(this[0]).topLine.companion.remove();                                             
                                         }          
                                         
                                         
                                            Snap(this[0]).topLine.text.remove();
                                            Snap(this[0]).topLine.remove();
                                            
                                        }  
                                        
                                        if( Snap(this[0]).botEntity !== 0){
                                            
                                            var indexE = Snap(this[0]).botEntity.relationships.indexOf(Snap(this[0]).botLine);  // find position of line within owner's relationships list
                                            Snap(this[0]).botEntity.relationships.splice(indexE);                         // remove element with that position from relationships list                                   
                                            
                                         if(Snap(this[0]).botLine.companion !== 0){                                             
                                              
                                                Snap(this[0]).botLine.companion.remove();                                             
                                         }        
                                         
                                            Snap(this[0]).botLine.text.remove();
                                            Snap(this[0]).botLine.remove();
                                            
                                        }        
                                        
                                        if( Snap(this[0]).leftEntity !== 0){
                                            
                                            var indexE = Snap(this[0]).leftEntity.relationships.indexOf(Snap(this[0]).leftLine);  // find position of line within owner's relationships list
                                            Snap(this[0]).leftEntity.relationships.splice(indexE);                         // remove element with that position from relationships list                                   
                                            
                                         if(Snap(this[0]).leftLine.companion !== 0){                                             
                                              
                                                Snap(this[0]).leftLine.companion.remove();
                                             
                                         }
                                        
                                            Snap(this[0]).leftLine.text.remove();
                                            Snap(this[0]).leftLine.remove();
                                            
                                        }    
                                        
                                        if( Snap(this[0]).rightEntity !== 0){
                                            
                                            var indexE = Snap(this[0]).rightEntity.relationships.indexOf(Snap(this[0]).rightLine);  // find position of line within owner's relationships list
                                            Snap(this[0]).rightEntity.relationships.splice(indexE);                         // remove element with that position from relationships list                                   
                                            
                                         if(Snap(this[0]).rightLine.companion !== 0){                                             
                                              
                                                Snap(this[0]).rightLine.companion.remove();                                             
                                         }      
                                         
                                            Snap(this[0]).rightLine.text.remove();
                                            Snap(this[0]).rightLine.remove();
                                            
                                        } 
                                        
                                        var indexE = globalRelationships.indexOf(Snap(this[0]));  // remove from global list
                                        globalRelationships.splice(indexE);  
                                        
                                        Snap(this[0]).text.remove;                             // remove name
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
                                         Snap(this[0]).sub.unions.splice(indexE);                         // remove element with that position from specializations list                                   
                                             
                                            if(Snap(this[0]).unionLine.companion !== 0){                                             
                                              
                                                Snap(this[0]).unionLine.companion.remove();                                             
                                            }   
                                         
                                            Snap(this[0]).unionLine.remove();                      
                                         
                                     }
                                     
                                     for(i=0; i<Snap(this[0]).supers.length; i++){        
                                            
                                                   var indexE = Snap(this[0]).supers[i].end.union_subs.indexOf(Snap(this[0]).supers[i]);  // find position of line within super's subclasses list
                                                   Snap(this[0]).supers[i].end.union_subs.splice(indexE);                         // remove element with that position from subclasses list                                   
                                                   Snap(this[0]).supers[i].remove();                                                         

                                        }
                                      
                                      Snap(this[0]).text.remove();                             // remove name
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
                                                 Snap(this[0]).super.specializations.splice(indexE);  

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
                                                 Snap(this[0]).super.specializations.splice(indexE);  

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
                                            Snap(this[0]).super.specializations.splice(indexE);                         // remove element with that position from attributes list                                   
                                            
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
                                            Snap(this[0]).super.specializations.splice(indexE);                         // remove element with that position from specializations list                                   
                                             
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
                                                   Snap(this[0]).subs[i].start.super_specializations.splice(indexE);                         // remove element with that position from subclasses list                                   
                                                   
                                                   if(Snap(this[0]).subs[i].criteria !== ""){
                                                

                                                        Snap(this[0]).subs[i].criteria = ""; 
                                                        Snap(this[0]).subs[i].text.remove();

                                                    }
                                         
                                         
                                                    Snap(this[0]).subs[i].remove();                                                         

                                        }
                                        
                                        Snap(this[0]).text.remove();                             // remove name
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
                                                Snap(this[0]).owner.attributes.splice(indexE);                                                           
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
                                                Snap(this[0]).owner.attributes.splice(indexE);                         // remove element with that position from attributes list                                   
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
                                            Snap(this[0]).notnull = true;
                                         
                                         
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
                                            Snap(this[0]).notnull = true;
                                         
                                         
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
                                                                      
                                            Snap(this[0]).notnull = true;
                                         
                                         
                                         }},
                                            "notnull-key2": {"name": "No",
                                         callback: function(key, opt) {
                                                                      
                                            Snap(this[0]).notnull = false;
                                        
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
                                    
                                    if(Snap(this[0]).notnull === true){
                                        
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
                                            Snap(this[0]).owner.attributes.splice(indexE);                                 // remove element with that position from attributes list                                   
                                            Snap(this[0]).ownerLine.remove();
                                            
                                        }   
                                        
                                        var indexE = globalAttributes.indexOf(Snap(this[0]));  // remove from global list
                                        globalAttributes.splice(indexE);  
                                        
                                        Snap(this[0]).text.remove();                             // remove name
                                        Snap(this[0]).remove();                                // remove target 
                                      
                                    }
                                  }                
                                 
                                }                 
                                
                              });
                              
                    
              
                
                  

                       


                            
                          
                            
                             
                        
                        