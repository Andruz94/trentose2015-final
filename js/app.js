/* SantaModel assists santa's helpers in packing children's requests.
 * It provides quality control by checking if the requests are being
 * fulfilled
 */

var SantaModel = {
  
  /* Initializes the model with a list of requests, 
   * and sets the first one as the current one 
   */
   init : function(list){
       
       this.list=requests;
       this.getCurrentRequest();
       
   },
  
   /* It moves "current" to the next request */
   next : function (){
      
    
    
   },
  
   /* Returns the current request. 
    * If all requests have been processed (there is no current one), it returns null 
    */
   getCurrentRequest : function () {
       
       var current=0;
       var array = [];
       array.push(this.list[current]);
       if(this.list[current]==undefined){
            return null;
       }
       
       this.list = array;
       return this.list;
       
   },  
    
   /* Packs the given item if it fulfills the current request.       
    * returns 1 if the given item fulfills the request (= answer)
    * returns 0 if the given item does not fulfill the request
    */
   pack : function(item) {
       
       for(var k=0; k<this.list.length; k++){
            if(this.list[k].answer==item){
                return 1;
            }else{
                return 0;
            }
       }
       
   }      
  
};

var Controller = {
    
    init : function () {
        SantaModel.init();
        View.init();
    },
    
    getRequests : function () {
        return SantaModel.list;
    }
};

var View = {
    
    init : function () {
        var array = Controller.getRequests();
        
        for(var i=0; i< array.length; i++){
            $(".question").append(array[i].question);
            $(".question-items").append("<li>"+array[i].options+"</li>");
        }
    }
};


$(document).ready(function(){
    
   Controller.init();
   var correct=0;
    
    $(".question-items").click(function(){
        SantaModel.next();
        correct=correct+SantaModel.pack();
        if(SantaModel.getCurrentRequest()==null){
            $(".question").html("");
            $(".question-items").html("");
            $(".result").html("Total points: "+ correct );
        }
    })
    
});
