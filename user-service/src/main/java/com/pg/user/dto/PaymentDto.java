package com.pg.user.dto;

import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor  // ✅ needed for new PaymentDto()
@AllArgsConstructor
public class PaymentDto {
    private Long paymentId;
    private Long userId;
    private Double amount;
    private String paymentMethod;
    private LocalDateTime paymentDate;
    
    private String userName; // <-- add this
}
