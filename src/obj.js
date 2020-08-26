export const isType = (obj, type) => {
  if (typeof obj !== 'object') return false;
  // 判断数据类型的经典方法：
  const typeString = Object.prototype.toString.call(obj);

  const target = '[object ' + type + ']';

  const flag = typeString === target || false;

  return flag;
};

export const deepClone = (obj) => {
  return deepClone(obj);
};

const clone = (parent) => {
  // 维护两个储存循环引用的数组
  const parents = [];
  const children = [];

  const _clone = (parent) => {
    if (parent === null) return null;
    if (typeof parent !== 'object') return parent;

    let child, proto;

    if (isType(parent, 'Array')) {
      child = [];
    } else if (isType(parent, 'RegExp')) {
      child = new RegExp(parent.source, getRegExp(parent));
      if (parent.lastIndex) child.lastIndex = parent.lastIndex;
    } else if (isType(parent, 'Date')) {
      child = new Date(parent.getTime());
    } else {
      // 处理对象原型
      proto = Object.getPrototypeOf(parent);
      // 利用Object.create切断原型链
      child = Object.create(proto);
    }

    const index = parents.indexOf(parent);

    if(index !== -1){
      return children[index]
    }
    parents.push(parent);
    children.push(child);

    for( const i in parent ){
      child[ i ] = _clone(parent[i])
    }

    return child
  };

  return _clone( parent )
};
