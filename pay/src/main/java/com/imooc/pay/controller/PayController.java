package com.imooc.pay.controller;

import com.imooc.pay.service.impl.PayService;
import com.lly835.bestpay.enums.BestPayTypeEnum;
import com.lly835.bestpay.model.PayResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

import java.math.BigDecimal;
import java.util.HashMap;
import java.util.Map;

@Slf4j
@Controller
@RequestMapping("/pay")
public class PayController {
	@Autowired
	PayService payService;

	@GetMapping("/create")
	public ModelAndView create(@RequestParam("orderId") String orderId,
														 @RequestParam("amount") BigDecimal amount,
														 @RequestParam("payType")BestPayTypeEnum bestPayTypeEnum){
		Map<String,String> map = new HashMap<>();


		PayResponse response = payService.create(orderId,amount,bestPayTypeEnum);


		//支付方式不同，渲染就不同，WX_NATIVE使用codeUrl,支付宝pc只用body
		if(bestPayTypeEnum==BestPayTypeEnum.WXPAY_NATIVE){
			map.put("codeUrl",response.getCodeUrl());
			return new ModelAndView("createForWxNative",map);

		}else if(bestPayTypeEnum== BestPayTypeEnum.ALIPAY_PC){
			map.put("body",response.getBody());
			return new ModelAndView("createForAliPayPc",map);
		}
		throw new RuntimeException("暂不支持的支付类型");

	}
	@PostMapping("/notify")
	public void asyncNotify(@RequestBody String notifyData){
		payService.asyncNotify(notifyData);
	}
}
