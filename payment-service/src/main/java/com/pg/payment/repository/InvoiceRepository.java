package com.pg.payment.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.pg.payment.entity.Invoice;

public interface InvoiceRepository extends JpaRepository<Invoice, Long> {
    Invoice findByPaymentId(Long paymentId);
}
