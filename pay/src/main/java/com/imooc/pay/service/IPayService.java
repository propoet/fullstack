package com.imooc.pay.service;

import com.lly835.bestpay.enums.BestPayTypeEnum;
import com.lly835.bestpay.model.PayResponse;

import java.math.BigDecimal;

public interface IPayService {
	/**
	 *创建发起支付
	 * @param orderId
	 * @param amount
	 * @return com.lly835.bestpay.model.PayResponse
	 */
	PayResponse create(String orderId, BigDecimal amount, BestPayTypeEnum bestPayTypeEnum);

	/**
	 *异步通知处理
	 * @param notifyData
	 * @return void
	 */
	String asyncNotify(String notifyData);

}
