package com.rn_github;

import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

public class TestModule extends ReactContextBaseJavaModule {
    private static final String TEST_MODULE_NAME = "Test";

    public TestModule(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @Override
    public String getName() {
        return TEST_MODULE_NAME;
    }

    /**
     * 在JavaScript中调用
     */
    @ReactMethod
    public void callMeName(Callback callback) {
        String name = "Test";
        callback.invoke(name);
    }

}
