import {
  AuthInstances
} from "./chunk-ATQPCTSK.js";
import {
  FirebaseApp,
  FirebaseApps,
  VERSION,
  ɵAngularFireSchedulers,
  ɵAppCheckInstances,
  ɵgetAllInstancesOf,
  ɵgetDefaultInstanceOf,
  ɵzoneWrap
} from "./chunk-ER4GGXZO.js";
import {
  InjectionToken,
  Injector,
  NgModule,
  NgZone,
  Optional,
  concatMap,
  distinct,
  from,
  makeEnvironmentProviders,
  map,
  setClassMetadata,
  timer,
  ɵɵdefineInjector,
  ɵɵdefineNgModule
} from "./chunk-T2Z2O7CU.js";
import {
  Component,
  FirebaseError,
  _getProvider,
  _registerComponent,
  getApp,
  getDefaultEmulatorHostnameAndPort,
  getModularInstance,
  registerVersion
} from "./chunk-FURRKYTR.js";
import {
  __async
} from "./chunk-5K356HEJ.js";

// node_modules/@firebase/functions/dist/index.esm2017.js
var LONG_TYPE = "type.googleapis.com/google.protobuf.Int64Value";
var UNSIGNED_LONG_TYPE = "type.googleapis.com/google.protobuf.UInt64Value";
function mapValues(o, f) {
  const result = {};
  for (const key in o) {
    if (o.hasOwnProperty(key)) {
      result[key] = f(o[key]);
    }
  }
  return result;
}
function encode(data) {
  if (data == null) {
    return null;
  }
  if (data instanceof Number) {
    data = data.valueOf();
  }
  if (typeof data === "number" && isFinite(data)) {
    return data;
  }
  if (data === true || data === false) {
    return data;
  }
  if (Object.prototype.toString.call(data) === "[object String]") {
    return data;
  }
  if (data instanceof Date) {
    return data.toISOString();
  }
  if (Array.isArray(data)) {
    return data.map((x) => encode(x));
  }
  if (typeof data === "function" || typeof data === "object") {
    return mapValues(data, (x) => encode(x));
  }
  throw new Error("Data cannot be encoded in JSON: " + data);
}
function decode(json) {
  if (json == null) {
    return json;
  }
  if (json["@type"]) {
    switch (json["@type"]) {
      case LONG_TYPE:
      case UNSIGNED_LONG_TYPE: {
        const value = Number(json["value"]);
        if (isNaN(value)) {
          throw new Error("Data cannot be decoded from JSON: " + json);
        }
        return value;
      }
      default: {
        throw new Error("Data cannot be decoded from JSON: " + json);
      }
    }
  }
  if (Array.isArray(json)) {
    return json.map((x) => decode(x));
  }
  if (typeof json === "function" || typeof json === "object") {
    return mapValues(json, (x) => decode(x));
  }
  return json;
}
var FUNCTIONS_TYPE = "functions";
var errorCodeMap = {
  OK: "ok",
  CANCELLED: "cancelled",
  UNKNOWN: "unknown",
  INVALID_ARGUMENT: "invalid-argument",
  DEADLINE_EXCEEDED: "deadline-exceeded",
  NOT_FOUND: "not-found",
  ALREADY_EXISTS: "already-exists",
  PERMISSION_DENIED: "permission-denied",
  UNAUTHENTICATED: "unauthenticated",
  RESOURCE_EXHAUSTED: "resource-exhausted",
  FAILED_PRECONDITION: "failed-precondition",
  ABORTED: "aborted",
  OUT_OF_RANGE: "out-of-range",
  UNIMPLEMENTED: "unimplemented",
  INTERNAL: "internal",
  UNAVAILABLE: "unavailable",
  DATA_LOSS: "data-loss"
};
var FunctionsError = class extends FirebaseError {
  constructor(code, message, details) {
    super(`${FUNCTIONS_TYPE}/${code}`, message || "");
    this.details = details;
  }
};
function codeForHTTPStatus(status) {
  if (status >= 200 && status < 300) {
    return "ok";
  }
  switch (status) {
    case 0:
      return "internal";
    case 400:
      return "invalid-argument";
    case 401:
      return "unauthenticated";
    case 403:
      return "permission-denied";
    case 404:
      return "not-found";
    case 409:
      return "aborted";
    case 429:
      return "resource-exhausted";
    case 499:
      return "cancelled";
    case 500:
      return "internal";
    case 501:
      return "unimplemented";
    case 503:
      return "unavailable";
    case 504:
      return "deadline-exceeded";
  }
  return "unknown";
}
function _errorForResponse(status, bodyJSON) {
  let code = codeForHTTPStatus(status);
  let description = code;
  let details = void 0;
  try {
    const errorJSON = bodyJSON && bodyJSON.error;
    if (errorJSON) {
      const status2 = errorJSON.status;
      if (typeof status2 === "string") {
        if (!errorCodeMap[status2]) {
          return new FunctionsError("internal", "internal");
        }
        code = errorCodeMap[status2];
        description = status2;
      }
      const message = errorJSON.message;
      if (typeof message === "string") {
        description = message;
      }
      details = errorJSON.details;
      if (details !== void 0) {
        details = decode(details);
      }
    }
  } catch (e) {
  }
  if (code === "ok") {
    return null;
  }
  return new FunctionsError(code, description, details);
}
var ContextProvider = class {
  constructor(authProvider, messagingProvider, appCheckProvider) {
    this.auth = null;
    this.messaging = null;
    this.appCheck = null;
    this.auth = authProvider.getImmediate({
      optional: true
    });
    this.messaging = messagingProvider.getImmediate({
      optional: true
    });
    if (!this.auth) {
      authProvider.get().then((auth) => this.auth = auth, () => {
      });
    }
    if (!this.messaging) {
      messagingProvider.get().then((messaging) => this.messaging = messaging, () => {
      });
    }
    if (!this.appCheck) {
      appCheckProvider.get().then((appCheck) => this.appCheck = appCheck, () => {
      });
    }
  }
  getAuthToken() {
    return __async(this, null, function* () {
      if (!this.auth) {
        return void 0;
      }
      try {
        const token = yield this.auth.getToken();
        return token === null || token === void 0 ? void 0 : token.accessToken;
      } catch (e) {
        return void 0;
      }
    });
  }
  getMessagingToken() {
    return __async(this, null, function* () {
      if (!this.messaging || !("Notification" in self) || Notification.permission !== "granted") {
        return void 0;
      }
      try {
        return yield this.messaging.getToken();
      } catch (e) {
        return void 0;
      }
    });
  }
  getAppCheckToken(limitedUseAppCheckTokens) {
    return __async(this, null, function* () {
      if (this.appCheck) {
        const result = limitedUseAppCheckTokens ? yield this.appCheck.getLimitedUseToken() : yield this.appCheck.getToken();
        if (result.error) {
          return null;
        }
        return result.token;
      }
      return null;
    });
  }
  getContext(limitedUseAppCheckTokens) {
    return __async(this, null, function* () {
      const authToken = yield this.getAuthToken();
      const messagingToken = yield this.getMessagingToken();
      const appCheckToken = yield this.getAppCheckToken(limitedUseAppCheckTokens);
      return {
        authToken,
        messagingToken,
        appCheckToken
      };
    });
  }
};
var DEFAULT_REGION = "us-central1";
function failAfter(millis) {
  let timer2 = null;
  return {
    promise: new Promise((_, reject) => {
      timer2 = setTimeout(() => {
        reject(new FunctionsError("deadline-exceeded", "deadline-exceeded"));
      }, millis);
    }),
    cancel: () => {
      if (timer2) {
        clearTimeout(timer2);
      }
    }
  };
}
var FunctionsService = class {
  /**
   * Creates a new Functions service for the given app.
   * @param app - The FirebaseApp to use.
   */
  constructor(app, authProvider, messagingProvider, appCheckProvider, regionOrCustomDomain = DEFAULT_REGION, fetchImpl) {
    this.app = app;
    this.fetchImpl = fetchImpl;
    this.emulatorOrigin = null;
    this.contextProvider = new ContextProvider(authProvider, messagingProvider, appCheckProvider);
    this.cancelAllRequests = new Promise((resolve) => {
      this.deleteService = () => {
        return Promise.resolve(resolve());
      };
    });
    try {
      const url = new URL(regionOrCustomDomain);
      this.customDomain = url.origin + (url.pathname === "/" ? "" : url.pathname);
      this.region = DEFAULT_REGION;
    } catch (e) {
      this.customDomain = null;
      this.region = regionOrCustomDomain;
    }
  }
  _delete() {
    return this.deleteService();
  }
  /**
   * Returns the URL for a callable with the given name.
   * @param name - The name of the callable.
   * @internal
   */
  _url(name2) {
    const projectId = this.app.options.projectId;
    if (this.emulatorOrigin !== null) {
      const origin = this.emulatorOrigin;
      return `${origin}/${projectId}/${this.region}/${name2}`;
    }
    if (this.customDomain !== null) {
      return `${this.customDomain}/${name2}`;
    }
    return `https://${this.region}-${projectId}.cloudfunctions.net/${name2}`;
  }
};
function connectFunctionsEmulator$1(functionsInstance, host, port) {
  functionsInstance.emulatorOrigin = `http://${host}:${port}`;
}
function httpsCallable$1(functionsInstance, name2, options) {
  return (data) => {
    return call(functionsInstance, name2, data, options || {});
  };
}
function httpsCallableFromURL$1(functionsInstance, url, options) {
  return (data) => {
    return callAtURL(functionsInstance, url, data, options || {});
  };
}
function postJSON(url, body, headers, fetchImpl) {
  return __async(this, null, function* () {
    headers["Content-Type"] = "application/json";
    let response;
    try {
      response = yield fetchImpl(url, {
        method: "POST",
        body: JSON.stringify(body),
        headers
      });
    } catch (e) {
      return {
        status: 0,
        json: null
      };
    }
    let json = null;
    try {
      json = yield response.json();
    } catch (e) {
    }
    return {
      status: response.status,
      json
    };
  });
}
function call(functionsInstance, name2, data, options) {
  const url = functionsInstance._url(name2);
  return callAtURL(functionsInstance, url, data, options);
}
function callAtURL(functionsInstance, url, data, options) {
  return __async(this, null, function* () {
    data = encode(data);
    const body = {
      data
    };
    const headers = {};
    const context = yield functionsInstance.contextProvider.getContext(options.limitedUseAppCheckTokens);
    if (context.authToken) {
      headers["Authorization"] = "Bearer " + context.authToken;
    }
    if (context.messagingToken) {
      headers["Firebase-Instance-ID-Token"] = context.messagingToken;
    }
    if (context.appCheckToken !== null) {
      headers["X-Firebase-AppCheck"] = context.appCheckToken;
    }
    const timeout = options.timeout || 7e4;
    const failAfterHandle = failAfter(timeout);
    const response = yield Promise.race([postJSON(url, body, headers, functionsInstance.fetchImpl), failAfterHandle.promise, functionsInstance.cancelAllRequests]);
    failAfterHandle.cancel();
    if (!response) {
      throw new FunctionsError("cancelled", "Firebase Functions instance was deleted.");
    }
    const error = _errorForResponse(response.status, response.json);
    if (error) {
      throw error;
    }
    if (!response.json) {
      throw new FunctionsError("internal", "Response is not valid JSON object.");
    }
    let responseData = response.json.data;
    if (typeof responseData === "undefined") {
      responseData = response.json.result;
    }
    if (typeof responseData === "undefined") {
      throw new FunctionsError("internal", "Response is missing data field.");
    }
    const decodedData = decode(responseData);
    return {
      data: decodedData
    };
  });
}
var name = "@firebase/functions";
var version = "0.11.7";
var AUTH_INTERNAL_NAME = "auth-internal";
var APP_CHECK_INTERNAL_NAME = "app-check-internal";
var MESSAGING_INTERNAL_NAME = "messaging-internal";
function registerFunctions(fetchImpl, variant) {
  const factory = (container, {
    instanceIdentifier: regionOrCustomDomain
  }) => {
    const app = container.getProvider("app").getImmediate();
    const authProvider = container.getProvider(AUTH_INTERNAL_NAME);
    const messagingProvider = container.getProvider(MESSAGING_INTERNAL_NAME);
    const appCheckProvider = container.getProvider(APP_CHECK_INTERNAL_NAME);
    return new FunctionsService(app, authProvider, messagingProvider, appCheckProvider, regionOrCustomDomain, fetchImpl);
  };
  _registerComponent(new Component(
    FUNCTIONS_TYPE,
    factory,
    "PUBLIC"
    /* ComponentType.PUBLIC */
  ).setMultipleInstances(true));
  registerVersion(name, version, variant);
  registerVersion(name, version, "esm2017");
}
function getFunctions(app = getApp(), regionOrCustomDomain = DEFAULT_REGION) {
  const functionsProvider = _getProvider(getModularInstance(app), FUNCTIONS_TYPE);
  const functionsInstance = functionsProvider.getImmediate({
    identifier: regionOrCustomDomain
  });
  const emulator = getDefaultEmulatorHostnameAndPort("functions");
  if (emulator) {
    connectFunctionsEmulator(functionsInstance, ...emulator);
  }
  return functionsInstance;
}
function connectFunctionsEmulator(functionsInstance, host, port) {
  connectFunctionsEmulator$1(getModularInstance(functionsInstance), host, port);
}
function httpsCallable(functionsInstance, name2, options) {
  return httpsCallable$1(getModularInstance(functionsInstance), name2, options);
}
function httpsCallableFromURL(functionsInstance, url, options) {
  return httpsCallableFromURL$1(getModularInstance(functionsInstance), url, options);
}
registerFunctions(fetch.bind(self));

// node_modules/rxfire/functions/index.esm.js
function httpsCallable2(functions, name2, options) {
  var callable = httpsCallable(functions, name2, options);
  return function(data) {
    return from(callable(data)).pipe(map(function(r) {
      return r.data;
    }));
  };
}

// node_modules/@angular/fire/fesm2022/angular-fire-functions.mjs
var Functions = class {
  constructor(functions) {
    return functions;
  }
};
var FUNCTIONS_PROVIDER_NAME = "functions";
var FunctionsInstances = class {
  constructor() {
    return ɵgetAllInstancesOf(FUNCTIONS_PROVIDER_NAME);
  }
};
var functionInstance$ = timer(0, 300).pipe(concatMap(() => from(ɵgetAllInstancesOf(FUNCTIONS_PROVIDER_NAME))), distinct());
var PROVIDED_FUNCTIONS_INSTANCES = new InjectionToken("angularfire2.functions-instances");
function defaultFunctionsInstanceFactory(provided, defaultApp) {
  const defaultAuth = ɵgetDefaultInstanceOf(FUNCTIONS_PROVIDER_NAME, provided, defaultApp);
  return defaultAuth && new Functions(defaultAuth);
}
function functionsInstanceFactory(fn) {
  return (zone, injector) => {
    const functions = zone.runOutsideAngular(() => fn(injector));
    return new Functions(functions);
  };
}
var FUNCTIONS_INSTANCES_PROVIDER = {
  provide: FunctionsInstances,
  deps: [[new Optional(), PROVIDED_FUNCTIONS_INSTANCES]]
};
var DEFAULT_FUNCTIONS_INSTANCE_PROVIDER = {
  provide: Functions,
  useFactory: defaultFunctionsInstanceFactory,
  deps: [[new Optional(), PROVIDED_FUNCTIONS_INSTANCES], FirebaseApp]
};
var FunctionsModule = class _FunctionsModule {
  constructor() {
    registerVersion("angularfire", VERSION.full, "fn");
  }
  static ɵfac = function FunctionsModule_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _FunctionsModule)();
  };
  static ɵmod = ɵɵdefineNgModule({
    type: _FunctionsModule
  });
  static ɵinj = ɵɵdefineInjector({
    providers: [DEFAULT_FUNCTIONS_INSTANCE_PROVIDER, FUNCTIONS_INSTANCES_PROVIDER]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(FunctionsModule, [{
    type: NgModule,
    args: [{
      providers: [DEFAULT_FUNCTIONS_INSTANCE_PROVIDER, FUNCTIONS_INSTANCES_PROVIDER]
    }]
  }], () => [], null);
})();
function provideFunctions(fn, ...deps) {
  registerVersion("angularfire", VERSION.full, "fn");
  return makeEnvironmentProviders([DEFAULT_FUNCTIONS_INSTANCE_PROVIDER, FUNCTIONS_INSTANCES_PROVIDER, {
    provide: PROVIDED_FUNCTIONS_INSTANCES,
    useFactory: functionsInstanceFactory(fn),
    multi: true,
    deps: [
      NgZone,
      Injector,
      ɵAngularFireSchedulers,
      FirebaseApps,
      // Defensively load Auth first, if provided
      [new Optional(), AuthInstances],
      [new Optional(), ɵAppCheckInstances],
      ...deps
    ]
  }]);
}
var httpsCallableData = ɵzoneWrap(httpsCallable2, true);
var connectFunctionsEmulator2 = ɵzoneWrap(connectFunctionsEmulator, true);
var getFunctions2 = ɵzoneWrap(getFunctions, true);
var httpsCallable3 = ɵzoneWrap(httpsCallable, true);
var httpsCallableFromURL2 = ɵzoneWrap(httpsCallableFromURL, true);
export {
  Functions,
  FunctionsInstances,
  FunctionsModule,
  connectFunctionsEmulator2 as connectFunctionsEmulator,
  functionInstance$,
  getFunctions2 as getFunctions,
  httpsCallable3 as httpsCallable,
  httpsCallableData,
  httpsCallableFromURL2 as httpsCallableFromURL,
  provideFunctions
};
/*! Bundled license information:

@firebase/functions/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

rxfire/functions/index.esm.js:
  (**
   * @license
   * Copyright 2021 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
*/
//# sourceMappingURL=@angular_fire_functions.js.map
