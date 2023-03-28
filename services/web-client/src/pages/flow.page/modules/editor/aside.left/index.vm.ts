import { TaskAttributeDefiniton, TaskDefinition } from '@ithan/core';

// * MOCK DATA
const sendMailTask = new TaskDefinition();
const askInterviewer = new TaskDefinition();
const provideLaptop = new TaskDefinition();
const provideCard = new TaskDefinition();
const provideOffer = new TaskDefinition();
const orientation = new TaskDefinition();
const createMail = new TaskDefinition();
const sendResultPV = new TaskDefinition();
sendResultPV.setName('Gửi kết quả phỏng vấn');
sendResultPV.setName('GUI_KET_QUA_PHONG_VAN');
sendResultPV.addOutCome({
  outcome: 'DONE',
  subOutCome: 'Gửi thành công',
});
sendResultPV.addOutCome({
  outcome: 'FAIL',
  subOutCome: ' Không phản hồi',
});
sendResultPV.addAttributeDefinition(
  TaskAttributeDefiniton.builder().setId(1).setName('name').setType({
    type: 'SCALAR',
    target: 'string',
  }),
);

createMail.setName('Tạo Email');
createMail.setCode('TAO_EMAIL');
createMail.addOutCome({
  outcome: 'DONE',
  subOutCome: 'Tạo thành công',
});
createMail.addOutCome({
  outcome: 'FAIL',
  subOutCome: 'Tạo thất bại',
});
createMail.addAttributeDefinition(
  TaskAttributeDefiniton.builder().setId(1).setName('name').setType({
    type: 'SCALAR',
    target: 'string',
  }),
);

orientation.setName('Orientation');
orientation.addOutCome({
  outcome: 'DONE',
  subOutCome: 'Thành công',
});
orientation.addOutCome({
  outcome: 'FAIL',
  subOutCome: 'Thất bại',
});
orientation
  .addAttributeDefinition(
    TaskAttributeDefiniton.builder().setId(1).setName('name').setType({
      type: 'SCALAR',
      target: 'string',
    }),
  )
  .addAttributeDefinition(
    TaskAttributeDefiniton.builder().setId(1).setName('Content').setType({
      type: 'SCALAR',
      target: 'string',
    }),
  );

provideOffer.setName('Gửi Offer Letter');
provideOffer.setCode('GUI_OFFER_LETTER');
provideOffer.addOutCome({
  outcome: 'DONE',
  subOutCome: 'Gửi thành công',
});
provideOffer.addOutCome({
  outcome: 'FAIL',
  subOutCome: 'Gửi thất bại',
});
provideOffer
  .addAttributeDefinition(
    TaskAttributeDefiniton.builder().setId(1).setName('name').setType({
      type: 'SCALAR',
      target: 'string',
    }),
  )
  .addAttributeDefinition(
    TaskAttributeDefiniton.builder().setId(1).setName('Offer').setType({
      type: 'SCALAR',
      target: 'string',
    }),
  );

provideCard.setName('Tạo Thẻ Nhân Viên');
provideCard.setName('TAO_THE_NHAN_VIEN');
provideCard.addOutCome({
  outcome: 'DONE',
  subOutCome: 'Tạo thành công',
});
provideCard.addOutCome({
  outcome: 'FAIL',
  subOutCome: 'Tạo thất bại',
});
provideCard
  .addAttributeDefinition(
    TaskAttributeDefiniton.builder().setId(1).setName('name').setType({
      type: 'SCALAR',
      target: 'string',
    }),
  )
  .addAttributeDefinition(
    TaskAttributeDefiniton.builder().setId(1).setName('Id').setType({
      type: 'SCALAR',
      target: 'string',
    }),
  );

provideLaptop.setName('Mua Laptop');
provideLaptop.addOutCome({
  outcome: 'DONE',
  subOutCome: 'Mua thành công',
});
provideLaptop.addOutCome({
  outcome: 'FAIL',
  subOutCome: 'Mua thất bại',
});
provideLaptop
  .addAttributeDefinition(
    TaskAttributeDefiniton.builder().setId(1).setName('name').setType({
      type: 'SCALAR',
      target: 'string',
    }),
  )
  .addAttributeDefinition(
    TaskAttributeDefiniton.builder().setId(1).setName('Seri').setType({
      type: 'SCALAR',
      target: 'string',
    }),
  )
  .addAttributeDefinition(
    TaskAttributeDefiniton.builder().setId(1).setName('Price').setType({
      type: 'SCALAR',
      target: 'number',
    }),
  );

sendMailTask.setName('Gửi Email cám ơn PV');
sendMailTask.setCode('GUI_EMAIL_CAM_ON_PV');
sendMailTask.addOutCome({
  outcome: 'DONE',
  subOutCome: 'Gửi thành công',
});
sendMailTask.addOutCome({
  outcome: 'FAIL',
  subOutCome: 'Gửi thất bại',
});

sendMailTask
  .addAttributeDefinition(
    TaskAttributeDefiniton.builder().setId(1).setName('name').setType({
      type: 'SCALAR',
      target: 'string',
    }),
  )
  .addAttributeDefinition(
    TaskAttributeDefiniton.builder().setId(1).setName('email').setType({
      type: 'SCALAR',
      target: 'string',
    }),
  );

askInterviewer.setName('Hỏi Interview về kết quả PV');
askInterviewer.setName('HOI_INTERVIEW_VE_KET_QUA_PV');
askInterviewer.addOutCome({
  outcome: 'DONE',
  subOutCome: 'Đậu',
});
askInterviewer.addOutCome({
  outcome: 'DONE',
  subOutCome: 'Rớt',
});
askInterviewer.addOutCome({
  outcome: 'FAIL',
  subOutCome: 'Không phản hồi',
});
askInterviewer.addAttributeDefinition(
  TaskAttributeDefiniton.builder().setId(1).setName('Thong tin').setType({
    type: 'SCALAR',
    target: 'string',
  }),
);

const listTaskDefinition: TaskDefinition[] = [sendMailTask, askInterviewer, provideLaptop, provideCard, orientation, createMail, provideOffer, sendResultPV];
// * MOCK DATA

export function useViewModel() {
  return { listTaskDefinition };
}
