package com.playground;

import android.widget.Button;

import com.facebook.react.ReactActivity;
import com.dieam.reactnativepushnotification.ReactNativePushNotificationPackage;
import br.com.vizir.rn.paypal.PayPalPackage;
//import rx.android.schedulers;
//import rx.Observable;
//import rx.Subscription;
//import rx.schedulers.Schedulers;

import com.remobile.toast.RCTToastPackage;
import com.github.xinthink.rnmk.ReactMaterialKitPackage;
import com.oblador.vectoricons.VectorIconsPackage;

public class MainActivity extends ReactActivity {

//    private Subscription subscription;
//
//    private void onButtonClicked(Button button) {
//        subscription = Observable.just(123L)
//                .subscribeOn(Schedulers.io())
//                .observeOn(AndroidSchedulers.mainThread())
//                .subscribe();
//    }
//
    /**
     * Returns the name of the main component registered from JavaScript.
     * This is used to schedule rendering of the component.
     */
    @Override
    protected String getMainComponentName() {
        return "Playground";
    }
}
