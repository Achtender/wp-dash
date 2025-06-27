'use client';

import { useContext } from 'react';
import { RenderBlock } from '@/components/craft-blocks';

// import CoreGroup from '@/components/blocks/core/CoreGroup';

// import { ScopeContext } from '@/components/utils/client-contexts';
import { InsetContext } from '@/components/utils/client-contexts';

const CorePostTemplate = ({}: RenderBlock) => {
  // const { scope } = useContext(ScopeContext) ?? {};
  const { inset } = useContext(InsetContext) ?? {};

  // console.log({ scope })
  // console.log({ inset })

  if (inset) {
    return (
      <InsetContext value={undefined}>
        {inset}
      </InsetContext>
    );
  }

  // return <CoreGroup {...self} blockName='core/group'>
  //   <pre>{JSON.stringify(scope, null, 2)}</pre>
  // </CoreGroup>;
};

export default CorePostTemplate;
