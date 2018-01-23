package cn.haiyang.service.city;

import cn.haiyang.dao.city.CityDao;
import cn.haiyang.domain.city.City;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CityServiceImpl implements CityService {
    @Autowired
    public CityDao cityDao;

    @Override
    public List<City> findProvince() {
        return cityDao.findByParentCityAreaNumIsNull();
    }
}
