package cn.haiyang.service.bankCardInfo.impl;

import cn.haiyang.dao.bankCardInfo.BankCardInfoDao;
import cn.haiyang.domain.bankCardInfo.BankCardInfo;
import cn.haiyang.service.bankCardInfo.BankCardInfoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class BankCardInfoServiceImpl implements BankCardInfoService {
    @Autowired
    private BankCardInfoDao bankCardInfoDao;

    @Override
    public BankCardInfo findByUserId(Integer userId) {
        return bankCardInfoDao.findByUserId(userId);
    }
}
