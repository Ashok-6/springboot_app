package com.pg.user.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.pg.user.entity.Payment;

public interface PaymentRepository extends JpaRepository<Payment, Long> {
}
