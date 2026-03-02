package com.pg.payment.feign;

//import org.springframework.cloud.openfeign.FeignClient;
//import org.springframework.web.bind.annotation.*;
//
//@FeignClient(name = "admin-service", url = "http://localhost:8081/api/admin/bills")
//public interface BillClient {
//
//    @PutMapping("/{billId}/status")
//    void updateBillStatus(@PathVariable("billId") Long billId,
//                          @RequestParam String status);
//}


//package com.pg.payment.feign;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestParam;

//@FeignClient(name = "admin-service", url = "http://localhost:8081/api/admin/bills")
@FeignClient(name = "billClient", url = "http://localhost:8081/api/admin/bills")
public interface BillClient {

    @PutMapping("/{billId}/status")
    void updateBillStatus(@PathVariable("billId") Long billId,
                          @RequestParam("status") String status);
}
