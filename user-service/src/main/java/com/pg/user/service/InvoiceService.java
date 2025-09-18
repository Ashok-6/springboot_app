package com.pg.user.service;

import java.io.ByteArrayInputStream;

import com.pg.user.dto.PaymentDto;
import com.pg.user.entity.Invoice;

public interface InvoiceService {
   ByteArrayInputStream generateInvoice(PaymentDto payment);
    Invoice saveInvoice(Long paymentId, ByteArrayInputStream pdfStream, String fileName);
    Invoice getInvoiceByPaymentId(Long paymentId);
}
