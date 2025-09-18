package com.pg.user.service;

import java.util.List;

import com.pg.user.dto.PaymentDto;

public interface PaymentService {

    // ✅ Create a new payment for a user
    PaymentDto createPayment(Long userId, String paymentMethod);

    
    
    PaymentDto getPaymentById(Long paymentId);

    List<PaymentDto> getAllPayments();
    
    
    
    
}
