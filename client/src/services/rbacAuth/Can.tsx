type Rules = {
  admin: {
    view: string[];
    actions: string[];
  };
  user: {
    view: string[];
    actions: string[];
  };
};

const check = (rules: Rules, role: "admin" | "user", action: string) => {
  const permissions = rules[role];
  if (!permissions) {
    return false;
  }
  const staticPermissions = permissions.view;
  if (staticPermissions && staticPermissions.includes(action)) {
    return true;
  }
  const dynamicPermissions = permissions.actions;
  if (dynamicPermissions) {
    const permissionCondition = dynamicPermissions.find((x) => x === action);
    if (!permissionCondition) {
      return false;
    }
    return true;
  }
  return false;
};
const RBAC_RULES = {
  admin: {
    view: ["dashboard"],
    actions: ["products:get"],
  },
  user: {
    view: ["home"],
    actions: [],
  },
};

const Can = (props: any) => {
  return check(RBAC_RULES, props.role, props.perform)
    ? props.yes()
    : props.no();
};
Can.defaultProps = {
  yes: () => null,
  no: () => null,
  role: "",
  perform: "",
};

export default Can;
