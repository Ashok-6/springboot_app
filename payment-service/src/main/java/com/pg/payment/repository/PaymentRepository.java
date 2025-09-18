package com.pg.payment.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.pg.payment.entity.Payment;

public interface PaymentRepository extends JpaRepository<Payment, Long> {
}
