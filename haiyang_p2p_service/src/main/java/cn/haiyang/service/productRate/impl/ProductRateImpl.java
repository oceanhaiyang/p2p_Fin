package cn.haiyang.service.productRate.impl;

import cn.haiyang.dao.product.IProductEarnRateDao;
import cn.haiyang.domain.product.ProductEarningRate;
import cn.haiyang.service.productRate.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductRateImpl implements ProductService {
    @Autowired
    private IProductEarnRateDao iProductEarnRateDao;

    @Override
    public List<ProductEarningRate> findByProductId(int proId) {
        return iProductEarnRateDao.findByProductId(proId);
    }
}
