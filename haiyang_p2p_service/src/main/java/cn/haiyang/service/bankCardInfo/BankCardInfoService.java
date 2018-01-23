package cn.haiyang.service.bankCardInfo;

import cn.haiyang.domain.bankCardInfo.BankCardInfo;

public interface BankCardInfoService {
    BankCardInfo findByUserId(Integer userId);
}
