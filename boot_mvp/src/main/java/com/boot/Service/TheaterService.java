package com.boot.Service;

import java.util.ArrayList;
import java.util.HashMap;

import com.boot.DTO.TheatertbDTO;

public interface TheaterService {
	public ArrayList<TheatertbDTO> theater(HashMap<String, String> param);
}