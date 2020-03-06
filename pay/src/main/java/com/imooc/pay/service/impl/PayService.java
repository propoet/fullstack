package com.imooc.pay.service.impl;

import com.imooc.pay.service.IPayService;
import com.lly835.bestpay.enums.BestPayPlatformEnum;
import com.lly835.bestpay.enums.BestPayTypeEnum;
import com.lly835.bestpay.model.PayRequest;
import com.lly835.bestpay.model.PayResponse;
import com.lly835.bestpay.service.BestPayService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
// 打印使用日志
@Slf4j
@Service
public class PayService implements IPayService {

  @Autowired private BestPayService bestPayService;

  @Override
  public PayResponse create(String orderId, BigDecimal amount, BestPayTypeEnum bestPayTypeEnum) {
    //
    //	if(bestPayTypeEnum!=BestPayTypeEnum.WXPAY_NATIVE&&bestPayTypeEnum!=BestPayTypeEnum.ALIPAY_PC){
    //			throw new RuntimeException("暂不支持的支付类型");
    //		}
    // 写入数据库
    PayRequest payRequest = new PayRequest();
    payRequest.setOrderName("2123976-最好的支付sdk");
    payRequest.setOrderId(orderId);
    payRequest.setOrderAmount(amount.doubleValue());
    payRequest.setPayTypeEnum(bestPayTypeEnum);
    PayResponse response = bestPayService.pay(payRequest);
    		log.info("response={}",response);

    return response;
  }

  @Override
  public String asyncNotify(String notifyData) {
    // 1.签名校验
    PayResponse payResponse = bestPayService.asyncNotify(notifyData);
    log.info("payResponse={}", payResponse);
    //		2.金额校验（从数据库查订单）
    //		3.修改订单支付状态
		if (payResponse.getPayPlatformEnum() == BestPayPlatformEnum.WX) {
			//4. 告诉微信不要再通知了
			return "<xml>\n" +
					"  <return_code><![CDATA[SUCCESS]]></return_code>\n" +
					"  <return_msg><![CDATA[OK]]></return_msg>\n" +
					"</xml>";
		}else if (payResponse.getPayPlatformEnum() == BestPayPlatformEnum.ALIPAY) {
			log.info("支付成功");
			return "success";
		}
		throw new RuntimeException("异步通知中错误的支付平台");

  }
}