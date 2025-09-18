package com.pg.user.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.pg.user.entity.Invoice;

public interface InvoiceRepository extends JpaRepository<Invoice, Long> {
    Invoice findByPaymentId(Long paymentId);
}
