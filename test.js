var assert= require('assert');

// 丑数

//判定是否为素数
function isprime(number)
{   
    for(i=2; i<=Math.sqrt(number); i++)
        if(number % i == 0)
            return false;
    return true;
}
//是否为丑数
function isUgly(number) {
   factors = [2, 3 ,5];
   //满足为 2，3，5 即为丑数
   for(var i =0; i < 3; i++) {
       if(factors[i] == number) {
           return true;
       }
   }
   //「2,3,5」 之外的素数不会为丑数
   if(isprime(number)) {
       return false 
   }   
   //判断是否能被  2，3，5整除。递归遍历至满足条件。
   for(var i =0; i < 3; i++) {
       if (number % factors[i] == 0)
       {
           return isUgly(number/factors[i]);
       }
   }
   return false;  
}

assert.equal(isUgly(8), true, "not ugly");
assert.equal(isUgly(14), false, "is ugly");




///链表

function List(data) {
    this._data = data;    
}
//链表尾追加节点
function append(list,item) {
    var p = list;
    while(p._nextNode) {
     p = p._nextNode;
    }
    p._nextNode = item;  
}

function remove(node) {
    node._nextNode = null;
    node = null;
}

//传入移除的数据，移除多个匹配节点
function removeNodesByData(list, data) {  
    tempNode = null;
    var q  = list;
    var pre = null;
    while (q) {     
        if(q._data  ==  data) {      
            //首节点为匹配的数据 ， 需要修改list next指向下个节点。          
            if (pre ==null) {
                tempNode = q;
                q = q._nextNode;
                list = q;               
            }
            // 正常情况移除， 需上个节点next指上匹配节点的next
            if (pre) {
                pre._nextNode  = q._nextNode;  
                tempNode = q;
                q = q._nextNode;      
               
            } 
            remove(tempNode);    
                      
        } else {
             pre = q;
             q = q._nextNode;            
        }
      
    }
   return  list;
}

function printList(list) {
    var q = list;
    var q_list = [];
    while (q) {       
        q_list.push(q._data);
        q = q._nextNode;    
    }
   return q_list;
}

var _list = new List(1);
var item1 = new List(2);
var item2 = new List(3);
var item3 = new List(3);
var item4 = new List(4);
var item5=  new List(5);
var item6 = new List(3);
append(_list,item1);
append(_list,item2);
append(_list,item3);
append(_list,item4);
append(_list,item5);
append(_list,item6);
assert.deepEqual(printList(_list),[1,2,3,3,4,5,3],"error");
assert.deepEqual(printList(removeNodesByData(_list, 3)), [1,2,4,5], "error");
  
