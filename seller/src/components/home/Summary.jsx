import React from "react";

function Summary() {
  return (
    <div>
      <div class="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow ">
       
        <div className="w-100 ">
          <h5 class="mb-2  font-semibold tracking-tight " style={{color:'#a31414'}}>
            Summary for This Month
          </h5>
          <hr />
        </div>
        <h3 className="py-3 text-sm">Total Items Shiped  :   <span style={{float:'right'}}>0</span></h3>
        <hr />
        <h1 className="py-3 text-sm">Total Earning  :   <span style={{float:'right'}}>$0.00</span></h1>
        <hr />
        <h1 className="py-3 text-sm">Total Ordered Items  :   <span style={{float:'right'}}>0</span></h1>
        <hr />
        <h1 className="py-3 text-sm">Clicks   :   <span style={{float:'right'}}>0</span></h1>
        <hr />
        <h1 className="py-3 text-sm">Conversation :   <span style={{float:'right'}}>0.00%</span></h1>
        <hr />
        <div className="m-3 py-3">
            <p className="text-right font-extralight text-sm text-slate-500">Last Update : March 04 2023</p>
            <p className="text-right text-slate-500 font-extralight text-sm ">Combined report for all tracking IDs</p> 
            
        </div>
        <a href="#" class="text-sm inline-flex items-center text-blue-600 hover:underline">
        View Full Report
        
    </a>
       </div>
    </div>
  );
}

export default Summary;
